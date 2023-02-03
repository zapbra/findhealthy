import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import COLORS from "../data/colors";
//import supabase from "../utils/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCircleChevronRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import supabase from "../utils/supabaseClient";
import {
  checkUsernameUnique,
  checkEmailUnique,
} from "../utils/supabaseFunctions";
import { SupabaseClient } from "@supabase/supabase-js";
import SignupForm from "../components/signin/signupForm";
import SigninForm from "../components/signin/signinForm";
const Cont = styled.div`
  position: relative;
  .login {
    overflow: hidden;
    max-width: 400px;
    background-color: ${(props) => props.colors.tan};
    border-radius: 8px;
    margin: 80px auto;
    input {
    }
  }
  form {
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    padding: 32px 32px 16px 32px;
    display: inline-flex;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
      padding: 16px 16px 8px 16px;
    }

    height: 100%;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    background-color: ${(props) => props.colors.darkBlue};
    border-radius: 8px 8px 0 0;
    @media only screen and (max-width: 600px) {
      padding: 16px 16px 16px 16px;
    }
  }
  .sign-up-toggle {
    background-color: ${(props) => props.colors.offWhite};
    display: flex;
    height: 48px;
    .toggle {
      flex: 1;
      border-bottom: 2px solid ${(props) => props.colors.redGrey};
      cursor: pointer;
      h5 {
        color: ${(props) => props.colors.redGrey};
      }
      &:hover {
        h5 {
          color: ${(props) => props.colors.darkBlue};
        }
      }
    }
    .selected {
      border-bottom: 2px solid ${(props) => props.colors.darkBlue};
      cursor: default;
      h5 {
        color: ${(props) => props.colors.darkBlue};
      }
    }
  }
  .grey-circle {
    width: 56px;
    height: 56px;
    border-radius: 50px;
    background-color: ${(props) => props.colors.offWhite};
  }
  .input-line {
    margin-bottom: 16px;
    h5 {
      margin-bottom: 4px;
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
  .forms-holder {
    width: 200%;
    display: flex;
    position: relative;
    transition: left 0.5s ease, height 0.5s ease;
    height: 100%;
  }
  .signup-footer {
    background-color: ${(props) => props.colors.darkBlue};
    padding: 32px;
    @media only screen and (max-width: 600px) {
      padding: 16px 16px 16px 16px;
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

  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
  const signIn = handleSubmit(async (formData) => {
    alert("k");
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.signInEmail,
        password: formData.signInPassword,
      });
      if (error) throw error;
      setLoading(false);
      router.push("/");
    } catch (error) {
      toast.error(`Incorrect email or password or not authenticated`);
    }
  });

  useEffect(() => {
    //const fetchUser = async () => {
    //const { data: session } = await supabase.auth.s;
    //};
  }, []);

  const [toggleState, setToggleState] = useState("sign up");
  const toggleRef = (state) => {
    setToggleState(state);
  };

  const [height, setHeight] = useState(0);

  const updateHeight = (val) => {
    setHeight(val);
  };

  return (
    <Cont colors={COLORS}>
      <div className="login">
        <div className="header">
          <div className="grey-circle mar-bottom-16"></div>
          <h5 className="white">FINDHEALTHY</h5>
        </div>
        <div className="sign-up-toggle">
          <div
            onClick={() => toggleRef("sign up")}
            className={
              toggleState == "sign up"
                ? "toggle selected flex align-center justify-center"
                : "toggle flex align-center justify-center"
            }
          >
            <h5 className="light">SIGN UP</h5>
          </div>
          <div
            onClick={() => toggleRef("sign in")}
            className={
              toggleState == "sign in"
                ? "toggle selected flex align-center justify-center"
                : "toggle flex align-center justify-center"
            }
          >
            <h5 className="light">SIGN IN</h5>
          </div>
        </div>
        <div
          className="forms-holder"
          style={{
            left: toggleState == "sign in" ? "-100%" : "0",
            height: toggleState == "sign in" ? height : "100%",
          }}
        >
          <SignupForm
            passwordState={passwordState}
            togglePasswordState={togglePasswordState}
          />

          <SigninForm
            signIn={signIn}
            passwordState={passwordState}
            togglePasswordState={togglePasswordState}
            updateHeight={updateHeight}
          />
        </div>
        <div className="signup-footer justify-center flex">
          {loading ? (
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : toggleState == "sign in" ? (
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              className="white icon-xl cursor"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              className="white icon-xl cursor"
            />
          )}
        </div>
      </div>
    </Cont>
  );
};

export default Signup;
