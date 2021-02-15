import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  useTag,
  useTagEdit,
  OperationEnum,
  TagEditDetailsInput,
} from "src/graphql";

import { LoadingIndicator } from "src/components/fragments";
import TagSelect from "src/components/tagSelect";
import { editHref } from "src/utils";
import TagForm from "./tagForm";

const TagMerge: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [mergeSources, setMergeSources] = useState<string[]>([]);
  const { data: tag, loading: loadingTag } = useTag({ id });
  const [insertTagEdit] = useTagEdit({
    onCompleted: (data) => {
      if (data.tagEdit.id) history.push(editHref(data.tagEdit));
    },
  });

  if (loadingTag) return <LoadingIndicator message="Loading tag..." />;
  if (!tag?.findTag?.id) return <div>Tag not found</div>;

  const doUpdate = (insertData: TagEditDetailsInput) => {
    insertTagEdit({
      variables: {
        tagData: {
          edit: {
            id: tag.findTag?.id,
            operation: OperationEnum.MERGE,
            merge_source_ids: mergeSources,
          },
          details: insertData,
        },
      },
    });
  };

  return (
    <div>
      <h2>
        Merge tags into <em>{tag.findTag.name}</em>
      </h2>
      <hr />
      <div className="row no-gutters">
        <div className="col-6">
          <TagSelect
            tags={[]}
            onChange={(tags) => setMergeSources(tags.map((t) => t.id))}
            message="Select tags to merge:"
            excludeTags={[tag.findTag.id, ...mergeSources]}
          />
        </div>
      </div>
      <hr className="my-4" />
      <h5>
        Modify <em>{tag.findTag.name}</em>
      </h5>
      <div className="row no-gutters">
        <TagForm tag={tag.findTag} callback={doUpdate} />
      </div>
    </div>
  );
};

export default TagMerge;
