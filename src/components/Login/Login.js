import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_PASSWORD") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: isEmailValid } = emailState;
  const { isValid: isPasswordValid } = passwordState;

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("run only once at the page load");
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity!");
      setFormIsValid(isEmailValid && isPasswordValid);
    }, 500);

    return () => {
      console.log("cleanup!!");
      clearTimeout(identifier);
    };
  }, [isEmailValid, isPasswordValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });

    setFormIsValid(event.target.value.includes("@") && isPasswordValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_PASSWORD", value: event.target.value });

    setFormIsValid(isEmailValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(isEmailValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "PASSWORD_BLUR" });
    // setPasswordIsValid(isPasswordValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!isEmailValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
    // authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type={"email"}
          id={"email"}
          label={"E-Mail"}
          className={classes.control}
          value={emailState.value}
          validInput={isEmailValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          type={"password"}
          id={"password"}
          label={"Password"}
          className={classes.control}
          value={passwordState.value}
          validInput={isPasswordValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
