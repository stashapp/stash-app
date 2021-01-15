import React from "react";
import { Link } from "react-router-dom";

import { Edits_queryEdits_edits_target as Target } from "src/definitions/Edits";
import { isTag, isPerformer } from "src/utils";

interface MergeEditProps {
  merges?: (Target | null)[] | null;
  target: Target | null;
}

const MergeEdit: React.FC<MergeEditProps> = ({ merges = [], target }) => {
  if (!merges || merges.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="row">
        <b className="col-2 text-right">Merge</b>
        <div>
          {merges?.map((source) => {
            if (isTag(source)) {
              return (
                <div key={source.id}>
                  <Link to={`/tags/${source.name}`}>{source.name}</Link>
                </div>
              );
            }
            if (isPerformer(source)) {
              return (
                <div key={source.id}>
                  <Link to={`/performers/${source.id}`}>{source.name}</Link>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="row">
        <b className="col-2 text-right">Into</b>
        <div>
          {isTag(target) && (
            <div>
              <Link to={`/tags/${target.name}`}>{target.name}</Link>
            </div>
          )}
          {isPerformer(target) && (
            <div>
              <Link to={`/performers/${target.id}`}>{target.name}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MergeEdit;
