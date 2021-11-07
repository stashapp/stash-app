import { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAddUser } from "src/graphql";
import { ROUTE_USERS } from "src/constants/route";
import UserForm, { UserData } from "./UserForm";

const AddUserComponent: FC = () => {
  const [queryError, setQueryError] = useState();
  const history = useHistory();
  const [insertUser] = useAddUser({
    onCompleted: () => {
      window.location.href = ROUTE_USERS;
    },
  });

  const doInsert = (userData: UserData) => {
    insertUser({ variables: { userData } })
      .then(() => history.push(ROUTE_USERS))
      .catch((res) => setQueryError(res.message));
  };

  const emptyUser = {
    id: "",
    name: "",
    email: "",
    password: "",
    roles: [],
  };

  return (
    <div className="col-6">
      <h3>Add user</h3>
      <hr />
      <UserForm user={emptyUser} error={queryError} callback={doInsert} />
    </div>
  );
};

export default AddUserComponent;
