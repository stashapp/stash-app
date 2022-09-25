import { FC } from "react";
import { Link } from "react-router-dom";

import { ROUTE_USER } from "src/constants/route";
import { createHref } from "src/utils";
import { EditList } from "src/components/list";
import { VoteStatusEnum } from "src/graphql";

interface Props {
  user: {
    id: string;
    name: string;
  };
}

const UserEditsComponent: FC<Props> = ({ user }) => (
  <>
    <h3>
      Edits by <Link to={createHref(ROUTE_USER, user)}>{user.name}</Link>
    </h3>
    <EditList userId={user.id} defaultVoteStatus={VoteStatusEnum.PENDING} />
  </>
);

export default UserEditsComponent;
