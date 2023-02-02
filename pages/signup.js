import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import styled from "styled-components";
import COLORS from "../data/colors";
import supabase from "../utils/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { checkUsernameUnique, checkEmailUnique } from "../utils/supabaseFunctions";
const Cont = styled.div`
  form {
    max-width: 400px;
    margin: 0 auto;
  }
  .header {
    text-align: center;
  }
  .white-bg {
    background: #fff;
    padding: 8px;
    border: 1px solid ${(props) => props.colors.grey};
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

const Signup = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const password = watch("password", "");
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

    const createUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              username: formData.username,
              avatar_url: "anon",
            },
          },
        });
        if(error) throw error;
        setValue("username", "");
        setValue("email", "");
        setValue("password", "");
        setValue("confirmPassword", "");
        toast('Please check your email for an authentication link. Thanks for signing up!', {
          duration: 4000,
          position: 'top-center',
        
          // Styling
          style: {},
          className: '',
        
          // Custom Icon
          icon: '✉️',
        
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
        
          // Aria
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        router.push('/welcome')
      } catch (error) {
        toast.error(`Error creating your account :( ${error.message}`)
        
      }
    };

    checkUsernameUnique(formData.username).then((res) =>
    res // is unique then check email unique
      ? checkEmailUnique(formData.email).then((res) =>
          // is unique then create user, not send error message
          res ? createUser() : toast.error('Email taken')
        ) // username isn't unique
      : toast.error("Username taken")
  );
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.s;
    };
  }, []);

  return (
    <Cont colors={COLORS} className="default-page">
      <div className="header">
        <div className="center-inline mar-bottom-32">
          <h3>THANKS FOR SIGNING UP</h3>
        </div>
        <div className="center-inline white-bg mar-bottom-32">
          <h4>WHY SIGN UP?</h4>
        </div>
        <h5 className="light black mar-bottom-16">
          This allows you to create posts attached to your account.
        </h5>

        <h5 className="light black mar-bottom-16 You can share your account, view your posts, edit your posts">
          You can share your account, view your posts, edit your posts
        </h5>
        <div className="beige-box mar-bottom-32">
          <p>
            If you don’t sign up, you won’t be able to edit your posts in the
            future, or see your collection of posts!{" "}
          </p>
          <p>
            Also, you won’t be able to save locations, or recieve notifications
          </p>
        </div>
        <div className="red-line mar-bottom-32"></div>
      </div>

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

        <div className="input-line">
          <h5>CONFIRM PASSWORD </h5>
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
            type={passwordState}
            placeholder="confirm password"
            name="confirmPassword"
          />

          {errors.confirmPassword?.type === "required" && (
            <p className="error">*Confirm Password</p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p className="error">*Passwords must match</p>
          )}
        </div>
        <button className="blue-btn-one">
          <h5>CREATE ACCOUNT</h5>
        </button>
      </form>
    </Cont>
  );
};

export default Signup;
