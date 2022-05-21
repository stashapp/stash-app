import { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import { useTagEditUpdate, TagEditDetailsInput } from "src/graphql";
import { createHref, isTag, isTagDetails } from "src/utils";
import TagForm from "./tagForm";

import { EditUpdate_findEdit as Edit } from "src/graphql/definitions/EditUpdate";
import { ROUTE_EDIT } from "src/constants";

export const TagEditUpdate: FC<{ edit: Edit }> = ({ edit }) => {
  const history = useHistory();
  const [submissionError, setSubmissionError] = useState("");
  const [updateTagEdit, { loading: saving }] = useTagEditUpdate({
    onCompleted: (result) => {
      if (submissionError) setSubmissionError("");
      if (result.tagEditUpdate.id)
        history.push(createHref(ROUTE_EDIT, result.tagEditUpdate));
    },
    onError: (error) => setSubmissionError(error.message),
  });

  if (!isTagDetails(edit.details) || (edit.target && !isTag(edit.target)))
    return null;

  const doUpdate = (updateData: TagEditDetailsInput, editNote: string) => {
    updateTagEdit({
      variables: {
        id: edit.id,
        tagData: {
          edit: {
            id: edit.target?.id,
            operation: edit.operation,
            comment: editNote,
            merge_source_ids: edit.merge_sources.map((s) => s.id),
          },
          details: updateData,
        },
      },
    });
  };

  return (
    <div>
      <h3>
        Update tag edit for
        <i className="ms-2">
          <b>{edit.target?.name ?? edit.details.name}</b>
        </i>
      </h3>
      <hr />
      <TagForm
        tag={edit.target}
        initial={edit.details}
        callback={doUpdate}
        saving={saving}
      />
      {submissionError && (
        <div className="text-danger text-end col-9">
          Error: {submissionError}
        </div>
      )}
    </div>
  );
};
