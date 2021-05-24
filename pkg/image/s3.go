package image

import (
	"bytes"
	"context"
	"crypto/md5"
	"encoding/hex"
	"net/http"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/stashapp/stash-box/pkg/manager/config"
	"github.com/stashapp/stash-box/pkg/models"
)

type S3Backend struct{}

func (s *S3Backend) WriteFile(file *bytes.Reader, image *models.Image) error {
	s3config := config.GetS3Config()
	minioClient, err := minio.New(s3config.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(s3config.AccessKey, s3config.Secret, ""),
		Secure: true,
	})
	if err != nil {
		return err
	}

	buf := new(bytes.Buffer)
	if _, err = buf.ReadFrom(file); err != nil {
		return err
	}
	if err := uploadS3File(*minioClient, buf.Bytes(), s3config.Bucket, image.ID.String()); err != nil {
		return err
	}

	if s3config.MaxDimension != 0 && (image.Width > s3config.MaxDimension || image.Height > s3config.MaxDimension) {
		if _, err = file.Seek(0, 0); err != nil {
			return err
		}
		resized, err := resizeImage(file, s3config.MaxDimension)
		if err != nil {
			return err
		}

		hash := md5.Sum([]byte(image.ID.String() + "-resized"))
		resizedID := hex.EncodeToString(hash[:])
		if err := uploadS3File(*minioClient, resized, s3config.Bucket, resizedID); err != nil {
			return err
		}
	}

	return nil
}

func (s *S3Backend) DestroyFile(image *models.Image) error {
	s3config := config.GetS3Config()
	minioClient, err := minio.New(s3config.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(s3config.AccessKey, s3config.Secret, ""),
		Secure: true,
	})
	if err != nil {
		return err
	}

	id := image.ID.String()
	path := id[0:2] + "/" + id[2:4] + "/" + id
	err = minioClient.RemoveObject(context.TODO(), s3config.Bucket, path, minio.RemoveObjectOptions{})

	if err != nil {
		return err
	}

	hash := md5.Sum([]byte(id + "-resized"))
	resizedID := hex.EncodeToString(hash[:])
	path = resizedID[0:2] + "/" + resizedID[2:4] + "/" + resizedID
	// Resized versions may or may not exist, so we attempt to delete and ignore the results
	_ = minioClient.RemoveObject(context.TODO(), s3config.Bucket, path, minio.RemoveObjectOptions{})

	return nil
}

func uploadS3File(client minio.Client, file []byte, bucket string, id string) error {
	ctx := context.TODO()

	// SVG is not correctly detected so we set it manually if the file is xml
	contentType := http.DetectContentType(file)
	if contentType == "text/xml; charset=utf-8" || contentType == "text/plain; charset=utf-8" {
		contentType = "image/svg+xml"
	}

	path := id[0:2] + "/" + id[2:4] + "/" + id
	_, err := client.PutObject(
		ctx,
		bucket,
		path,
		bytes.NewReader(file),
		int64(len(file)),
		minio.PutObjectOptions{
			ContentType: contentType,
		},
	)

	return err
}
