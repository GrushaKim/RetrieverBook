import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useHistory } from "react-router";
import Select from "react-select";
import Swal from "sweetalert2";
import { PhotoCamera } from "@material-ui/icons";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const from = useRef();
  const city = useRef();
  const relationship = useRef();
  const history = useHistory();
  const [selectedValue, setSelectedValue] = useState(1);
  const [file, setFile] = useState(null);

  //relationship options for select
  const options = [
    {value: 1, label: "Single"},
    {value: 2, label: "Married"},
    {value: 3, label: "Don't ask!"} 
  ];
  
  //prop the selected value for relationship
  const changeHandler = e => {
    setSelectedValue(e.value);
  }

  //success message for sign up
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  //submit for sign up
  const handleClick = async (e) => {

    e.preventDefault();

    const newUser = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        from: from.current.value,
        city: city.current.value,
        relationship: selectedValue,
    };
    //upload a profile picture of a new user
    if(file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newUser.profilePicture = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    //check password match
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
     
      try {
        await axios.post("/auth/register", newUser);
        Toast.fire({
          icon: 'success',
          title: 'Signed up successfully'
        });
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
          <form className="registerBox" onSubmit={handleClick}>
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
            <input
              placeholder="Where are you from?"
              required
              ref={from}
              className="loginInput"
              type="text"
            />
            <input
              placeholder="Where do you live?"
              required
              ref={city}
              className="loginInput"
              type="text"
            />
            <div className="loginInput2">
             <label htmlFor="file">
              <PhotoCamera style={{fontSize:"30px"}}htmlColor="#7C83FD" className="uploadIcon" />
              <span className="uploadText">Upload your profile picture</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
              </label>
            </div>
            <Select 
              options={options} 
              required
              placeholder="Select your current relationship"
              ref={relationship}
              className="selectOption"
              value={options.find(obj => obj.value === selectedValue)}
              onChange={changeHandler}
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
