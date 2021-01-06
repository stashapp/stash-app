import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import { loader } from "graphql.macro";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthContext, { ContextType } from "src/AuthContext";
import * as yup from "yup";
import cx from "classnames";
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from "src/definitions/ResetPasswordMutation";

const ResetPassword = loader("src/mutations/ResetPassword.gql");

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});
type ResetPasswordFormData = yup.InferType<typeof schema>;

const ForgotPassword: React.FC = () => {
  const history = useHistory();
  const [resetEmail, setResetEmail] = useState("");
  const Auth = useContext<ContextType>(AuthContext);
  const [submitError, setSubmitError] = useState<string | undefined>();

  const { register, handleSubmit, errors } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const [resetPassword, { loading }] = useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPassword);

  if (Auth.authenticated) history.push("/");

  const onSubmit = (formData: ResetPasswordFormData) => {
    const userData = {
      email: formData.email,
    };
    setSubmitError(undefined);
    resetPassword({ variables: { input: userData } })
      .then(() => {
        setResetEmail(formData.email);
      })
      .catch((err) => {
        if (err && err.message) {
          setSubmitError(err.message as string);
        }
      });
  };

  if (resetEmail)
    return (
      <div className="LoginPrompt mx-auto d-flex">
        <div className="align-self-center col-8 mx-auto">
          <h5>Pasword reset</h5>
          <p>If a matching account was found an email was sent to { resetEmail } to allow you to reset your password.</p>
          <a href="/login">Return to login</a>
        </div>
      </div>
    );

  return (
    <div className="LoginPrompt mx-auto d-flex">
      <form
        className="align-self-center col-8 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="row" htmlFor="email">
          <span className="col-4">Email: </span>
          <input
            className={cx("col-8", { "is-invalid": errors?.email })}
            name="email"
            type="email"
            placeholder="Email"
            ref={register}
          />
          <div className="invalid-feedback">{errors?.email?.message}</div>
        </label>
        <div className="row">
          <div className="col-3 offset-9 d-flex justify-content-end pr-0">
            <div>
              <button type="submit" className="register-button btn btn-primary" disabled={loading}>
                Reset Password
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="text-danger">{submitError}</div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
