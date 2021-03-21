import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import "./LogIn.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { userInfoContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const LogIn = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userInfoContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const [newUser, setNewUser] = useState(true);

  // Form sign in with email and password
  const onSubmit = (user) => {
    const f_name = user.name;
    console.log(f_name);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          var user = res.user;
          const { email } = user;
          const signedInUser = {
            email: email,
          };
          setUserInfo(signedInUser);
          setLoggedInUser(signedInUser);
          updateName(f_name);
          setNewUser(false);
        })
        .catch((error) => {
          const user = {};
          user.error = error.message;
          setUserInfo(user);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const user = res.user;
          setUserInfo(user);
          setLoggedInUser(user);
          history.replace(from);
          console.log("user created ", res.name);
        })
        .catch((error) => {
          const user = {};
          user.error = error.message;
          setUserInfo(user);
        });
    }
  };
  const updateName = (name) => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // google sing in
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = {
          name: displayName,
          email: email,
        };
        setUserInfo(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  // Facebook Sign in
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleFbSignIn = () => {
    console.log("facebook");
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = {
          name: displayName,
          email: email,
        };
        setUserInfo(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  // Form password validation
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  return (
    <div className="d-flex justify-content-center">
      <div>
        <div className="email-login">
          <h3>{newUser ? "Create an account" : ""}</h3>
          <form className="login-box" onSubmit={handleSubmit(onSubmit)}>
            {newUser && (
              <input
                name="name"
                placeholder="Name"
                ref={register({ required: true })}
              />
            )}
            {errors.name && <p>Name is required</p>}

            <input
              name="email"
              placeholder="Email"
              type="email"
              ref={register({
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
              name="password"
              type="password"
              placeholder="Password"
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            {newUser && (
              <input
                name="password_repeat"
                type="password"
                placeholder="Confirm Password"
                ref={register({
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
            )}
            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

            <span>{userInfo.error}</span>

            <button type="submit">
              {newUser ? "Create an account" : "Log In"}
            </button>
          </form>
          {newUser ? (
            <p className="already-login">
              Already have an account?
              <button onClick={() => setNewUser(!newUser)}>Login</button>
            </p>
          ) : (
            <p className="already-login">
              Don't have an account?
              <button onClick={() => setNewUser(!newUser)}>Signup</button>
            </p>
          )}
        </div>
        <div className="other-login">
          <p className="separator">or</p>
          <div className="googleBtn">
            <button onClick={handleGoogleSignIn}>
              <FontAwesomeIcon icon={faGoogle} />
              Google Sing In
            </button>
          </div>
          <div className="facebookBtn">
            <button onClick={handleFbSignIn}>
              <FontAwesomeIcon icon={faFacebookF} />
              Facebook Sing In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
