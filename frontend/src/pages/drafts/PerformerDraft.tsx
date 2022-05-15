import { FC } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Draft_findDraft as Draft,
  Draft_findDraft_data_PerformerDraft as PerformerDraft,
} from "src/graphql/definitions/Draft";
import {
  usePerformer,
  usePerformerEdit,
  OperationEnum,
  PerformerEditDetailsInput,
} from "src/graphql";
import { LoadingIndicator } from "src/components/fragments";
import { editHref, performerHref } from "src/utils";
import { parsePerformerDraft } from "./parse";

import PerformerForm from "src/pages/performers/performerForm";

interface Props {
  draft: Omit<Draft, "data"> & { data: PerformerDraft };
}

const AddPerformerDraft: FC<Props> = ({ draft }) => {
  const isUpdate = Boolean(draft.data.id);
  const history = useHistory();
  const [submitPerformerEdit, { loading: saving }] = usePerformerEdit({
    onCompleted: (data) => {
      if (data.performerEdit.id) history.push(editHref(data.performerEdit));
    },
  });
  const { data: performer, loading: loadingPerformer } = usePerformer(
    { id: draft.data.id ?? "" },
    !isUpdate
  );

  if (loadingPerformer) return <LoadingIndicator />;

  const doInsert = (
    updateData: PerformerEditDetailsInput,
    editNote: string
  ) => {
    const details: PerformerEditDetailsInput = {
      ...updateData,
      draft_id: draft.id,
    };

    submitPerformerEdit({
      variables: {
        performerData: {
          edit: {
            id: draft.data.id,
            operation: isUpdate ? OperationEnum.MODIFY : OperationEnum.CREATE,
            comment: editNote,
          },
          details,
        },
      },
    });
  };

  const [initialPerformer, unparsed] = parsePerformerDraft(draft.data);
  const remainder = Object.entries(unparsed)
    .filter(([, val]) => !!val)
    .map(([key, val]) => (
      <li key={key}>
        <b className="me-2">{key}:</b>
        <span>{val}</span>
      </li>
    ));

  return (
    <div>
      <h3>{isUpdate ? "Update" : "Add new"} performer from draft</h3>
      {isUpdate && performer?.findPerformer && (
        <h6>
          Performer:{" "}
          <Link to={performerHref(performer.findPerformer)}>
            {performer.findPerformer?.name}
          </Link>
        </h6>
      )}
      <hr />
      {remainder.length > 0 && (
        <>
          <h6>Unmatched data:</h6>
          <ul>{remainder}</ul>
          <hr />
        </>
      )}
      <PerformerForm
        performer={performer?.findPerformer ?? undefined}
        callback={doInsert}
        saving={saving}
        initial={initialPerformer}
      />
    </div>
  );
};

export default AddPerformerDraft;
