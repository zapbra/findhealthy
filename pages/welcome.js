import styled from "styled-components";
import { useState } from "react";
import COLORS from "../data/colors";
import { useForm } from "react-hook-form";
const Cont = styled.div`

`;
const Welcome = () => {
    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
      } = useForm();

      const [passwordState, setPasswordState] = useState("password");
    const togglePasswordState = () => {
    setPasswordState((prev) => {
      if (prev === "password") {
        return "text";
      } else {
        return "password";
      }
    });
  };

      const submitForm = handleSubmit(async (formData) => {

      });

  return (
    <Cont colors = {COLORS} className = 'default-page'>
<form onSubmit={submitForm}>
        <div className="input-line">
          <h5>USERNAME</h5>
          <input
            {...register("username", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9_$]{1,20}$/,
                message:
                  "*Username must be 1-20 letters and can only contain letters, numbers, and _. Ex. james3.",
              },
            })}
            type="text"
            placeholder="username"
            name="username"
          />
          {errors.username?.type === "required" && (
            <p className="error">*Username is required</p>
          )}
          {errors.username?.type === "pattern" && (
            <p className="error">*{errors.username.message}</p>
          )}
        </div>

        <div className="input-line">
          <h5>EMAIL</h5>
          <input
            {...register("email", {
              required: true,
            })}
            type="email"
            placeholder="example@gmail.com"
            name="email"
          />
          {errors.email?.type === "required" && (
            <p className="error">*Email is required</p>
          )}
        </div>

        <div className="input-line">
          <h5>PASSWORD</h5>
          <div className="tags-input-box">
            <input
              {...register("password", {
                required: true,
                pattern: {
                  value: /.{4,50}/,
                  message: "Minimum of 4 letters",
                },
              })}
              type={passwordState}
              placeholder="password"
              name="password"
            />
            <FontAwesomeIcon
              onClick={togglePasswordState}
              icon={passwordState === "password" ? faEye : faEyeSlash}
              className="blue icon-sm"
            />
          </div>

          {errors.password?.type === "required" && (
            <p className="error">*Password is required</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="error">*{errors.password.message}</p>
          )}
        </div>

        
        <button className="blue-btn-one">
          <h5>CREATE ACCOUNT</h5>
        </button>
      </form>
    </Cont>
  )
}

export default Welcome;