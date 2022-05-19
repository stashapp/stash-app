import { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  usePerformerEdit,
  OperationEnum,
  PerformerEditDetailsInput,
} from "src/graphql";
import { editHref } from "src/utils";

import PerformerForm from "./performerForm";

const PerformerAdd: FC = () => {
  const history = useHistory();
  const [submissionError, setSubmissionError] = useState("");
  const [submitPerformerEdit, { loading: saving }] = usePerformerEdit({
    onCompleted: (data) => {
      if (submissionError) setSubmissionError("");
      if (data.performerEdit.id) history.push(editHref(data.performerEdit));
    },
    onError: (error) => setSubmissionError(error.message),
  });

  const doInsert = (
    updateData: PerformerEditDetailsInput,
    editNote: string
  ) => {
    submitPerformerEdit({
      variables: {
        performerData: {
          edit: {
            operation: OperationEnum.CREATE,
            comment: editNote,
          },
          details: updateData,
        },
      },
    });
  };

  return (
    <div>
      <h3>Add new performer</h3>
      <hr />
      <PerformerForm callback={doInsert} saving={saving} />
      {submissionError && (
        <div className="text-danger text-end col-9">
          Error: {submissionError}
        </div>
      )}
    </div>
  );
};

export default PerformerAdd;
