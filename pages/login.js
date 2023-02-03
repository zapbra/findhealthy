import { useEffect, useState, useRef } from "react";
import {useRouter} from "next/router";
import styled from "styled-components";
import COLORS from "../data/colors";
//import supabase from "../utils/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCircleChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import supabase from '../utils/supabaseClient'
import { checkUsernameUnique, checkEmailUnique } from "../utils/supabaseFunctions";
const Cont = styled.div`

position:relative;
.login{
  overflow:hidden;
  max-width:400px;
  background-color: ${props=>props.colors.tan};
  border-radius: 8px;
  margin: 80px auto;
  input{
    
  }
}
  form {
    max-width: 400px;
    margin: 0 auto;
    width:100%;
    padding: 32px 32px 16px 32px;
    display:inline-flex;
    flex-direction: column;
    
    height:100%;
  }
 .header{
  display:flex;
  flex-direction:column;
  align-items: center;
  padding: 32px;
  background-color: ${props=>props.colors.darkBlue};
  border-radius: 8px 8px 0 0;
 }
 .sign-up-toggle{
  background-color: ${props=>props.colors.offWhite};
  display:flex;
  height:48px;
  .toggle{
    flex:1;
    border-bottom: 2px  solid ${props=>props.colors.redGrey};
    cursor:pointer;
    h5{
      color: ${props=>props.colors.redGrey};
    }
    &:hover{
      h5{
        color:  ${props=>props.colors.darkBlue};
      }
    }
  }
  .selected{
    border-bottom: 2px solid ${props=>props.colors.darkBlue};
    cursor:default;
    h5{
      color: ${props=>props.colors.darkBlue};
    }
  }
 }
 .grey-circle{
  width:56px;
  height:56px;
  border-radius: 50px;
  background-color: ${props=>props.colors.offWhite};
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
  .forms-holder{
    width:200%;
    display:flex;
    position: relative;
    transition: left .5s ease, height .5s ease;
    height:100%;
   
  }
  .signup-footer{
    background-color: ${(props) => props.colors.darkBlue};
    padding: 32px;
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
    setLoading(true);
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
        setLoading(false);
      } catch (error) {
        toast.error(`Error creating your account :( ${error.message}`)
        console.log(error);
      }
    };
    createUser();
    /*
    checkUsernameUnique(formData.username).then((res) =>
    res // is unique then check email unique
      ? checkEmailUnique(formData.email).then((res) =>
          // is unique then create user, not send error message
          res ? createUser() : toast.error('Email taken')
        ) // username isn't unique
      : toast.error("Username taken")
  );  */
  });

  useEffect(() => {
    //const fetchUser = async () => {
      //const { data: session } = await supabase.auth.s;
    //};
  }, []);


  const [toggleState, setToggleState] = useState('sign in');
  const toggleRef = (state) => {
    setToggleState(state);
  }
 
  const signInRef = useRef(null);
  
  return (
    <Cont colors={COLORS}>
      <div className=  'login'>
    <div className="header">
      <div className="grey-circle mar-bottom-16"></div>
      <h5 className="white">
       FINDHEALTHY
      </h5>
    </div>
    <div className="sign-up-toggle">
      <div onClick = {()=>toggleRef('sign up')} className={toggleState == 'sign up' ? "toggle selected flex align-center justify-center" : "toggle flex align-center justify-center"}>
        <h5 className="light">SIGN UP</h5>
      </div>
      <div onClick = {()=>toggleRef('sign in')} className={toggleState == 'sign in' ? "toggle selected flex align-center justify-center" : "toggle flex align-center justify-center"}>
        <h5 className="light">SIGN IN</h5>
      </div>
    </div>
    <div className="forms-holder" style = {{left: toggleState == 'sign in' ? '-100%' : '0', height: toggleState == 'sign in' ? signInRef.current.clientHeight  :'100%'}}>
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
      </form>

      <form onSubmit={submitForm} ref = {signInRef}>

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
      </form>
      
      </div>
      <div className="signup-footer justify-center flex">
          
          {loading ? (
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        ) : (
          { toggleState == 'sign in'? (
          <FontAwesomeIcon icon = {faCircleChevronRight} className = 'white icon-xl cursor' />
          ) : (
            <FontAwesomeIcon icon = {faCircleChevronRight} className = 'white icon-xl cursor' />
          )
          }
        )}
      </div>
      </div>
    </Cont>
  );
};

export default Signup;
