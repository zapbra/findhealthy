import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SigninForm = ({
  signIn,
  passwordState,
  togglePasswordState,
  updateHeight,
}) => {
  const signInRef = useRef(null);

  useEffect(() => {
    updateHeight(signInRef?.current?.clientHeight + 20);
  }, [signInRef]);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={signIn} ref={signInRef}>
      <div className="input-line">
        <h5>EMAIL</h5>
        <input
          {...register("emailSignIn", {
            required: true,
          })}
          type="email"
          placeholder="example@gmail.com"
          name="emailSignIn"
        />
        {errors.emailSignIn?.type === "required" && (
          <p className="error">*Email is required</p>
        )}
      </div>

      <div className="input-line">
        <h5>PASSWORD</h5>
        <div className="tags-input-box">
          <input
            {...register("passwordSignIn", {
              required: true,
              pattern: {
                value: /.{4,50}/,
                message: "Minimum of 4 letters",
              },
            })}
            type={passwordState}
            placeholder="password"
            name="passwordSignIn"
          />
          <FontAwesomeIcon
            onClick={togglePasswordState}
            icon={passwordState === "password" ? faEye : faEyeSlash}
            className="blue icon-sm"
          />
        </div>

        {errors.passwordSignIn?.type === "required" && (
          <p className="error">*Password is required</p>
        )}
        {errors.passwordSignIn?.type === "pattern" && (
          <p className="error">*{errors.password.message}</p>
        )}
      </div>
    </form>
  );
};

export default SigninForm;
