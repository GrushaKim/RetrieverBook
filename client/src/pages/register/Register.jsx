import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">RetrieverBook</h3>
          <span className="loginDesc">
          Share your retriever world with us!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Your name"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Retriever@gmail.com"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Your password at least 4 characters"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="4"
            />
            <input
              placeholder="Reconfirm your password"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}
