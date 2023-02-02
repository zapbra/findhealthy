import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import COLORS from "../data/colors";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { shootFireworks } from "../utils/functions";
import supabase from '../utils/supabaseClient';
const Cont = styled.div`
form {
    max-width: 400px;
    margin: 0 auto;
  }
  .input-line {
    h5 {
      margin-bottom: 8px;
    }
  }
  .tags-input-box {
    position: relative;
    padding: 0;
    input {
      width: 100%;
      padding: 8px;
    }
    .blue {
      position: absolute;
      top: calc(50% - 12px);
      right: 8px;
      cursor: pointer;
      &:hover {
        color: ${(props) => props.colors.redGrey};
      }
    }
  }
`;
const Welcome = () => {
    const router = useRouter();
  useEffect(()=> {
    shootFireworks();
  },[]);
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
        try{
        const {data, error} = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;
        router.push('/');
      } catch (error) {
        errorText.current.innerText = 'Incorrect email or password or you need to authenticate';
      }

      });
 const errorText = useRef(null);
  return (
    <Cont colors = {COLORS} className = 'default-page box-shadow-2'>
<form onSubmit={submitForm}>
       <div className="center-inline">
    <h3 className = 'mar-bottom-16 underline'>THANKS FOR SIGNING UP</h3>
    <p className = 'bold'>Please check your email for the authentication link, then sign in below </p>
    <p className=" mar-bottom-32">(It might be in your junk folder)</p>
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
            <p ref = {errorText} className="error"></p>
        
        <button className="blue-btn-one">
          <h5>LOGIN</h5>
        </button>
      </form>
    </Cont>
  )
}

export default Welcome;