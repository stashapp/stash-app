import { FC, useContext, useState } from "react";
import { isApolloError } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import AuthContext, { ContextType } from "src/AuthContext";
import { Button, Form, Row, Col } from "react-bootstrap";

import { useQueryParams } from "src/hooks";
import { userHref } from "src/utils";
import { ErrorMessage } from "src/components/fragments";
import Title from "src/components/title";
import { useConfirmChangeEmail } from "src/graphql";
import { ROUTE_HOME } from "src/constants/route";

const ConfirmChangeEmail: FC = () => {
  const navigate = useNavigate();
  const Auth = useContext<ContextType>(AuthContext);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [{ token }] = useQueryParams({
    token: { name: "token", type: "string" },
  });

  const [confirmChangeEmail, { loading }] = useConfirmChangeEmail();

  if (!token) return <ErrorMessage error="Missing token" />;
  if (submitError) return <ErrorMessage error={submitError} />;

  if (Auth.authenticated) navigate(ROUTE_HOME);

  const onSubmit = () => {
    setSubmitError(undefined);
    confirmChangeEmail({ variables: { token } })
      .then(() => {
        if (Auth.user) navigate(userHref(Auth.user));
      })
      .catch(
        (error: unknown) =>
          error instanceof Error &&
          isApolloError(error) &&
          setSubmitError(error.message)
      );
  };

  return (
    <div className="LoginPrompt">
      <Title page="Confirm Email" />
      <Form className="align-self-center col-8 mx-auto" onSubmit={onSubmit}>
        <Row>
          <Col
            xs={{ span: 3, offset: 9 }}
            className="justify-content-end mt-2 d-flex"
          >
            <Button type="submit" disabled={loading}>
              Confirm email change
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ConfirmChangeEmail;
