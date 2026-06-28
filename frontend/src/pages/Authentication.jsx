import React from 'react'
import "../App.css";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";

export default function Authentication() {

   const [email,setEmail] =React.useState("");
   const [password,setPassword] =React.useState("");
   const [name,setName] =React.useState("");
   const [error,setError] =React.useState("");
   const [message,setMessage]=React.useState("");

   const [formState,setFormState] =React.useState(0);  //login/register

   const [open,setOpen] =React.useState(false); //for snackbar

 const {handleRegister,handleLogin}=React.useContext(AuthContext);


 let handleAuth = async () => {
  try {

    if (formState === 0) {
 
      await handleLogin(email, password);

      setMessage("Login Successful");
      setError("");
      setOpen(true);

    } else {

      let result = await handleRegister(name,email,password);
      setMessage(result);
      setError("");
      setOpen(true);
      setFormState(0);
      setName("");
      setEmail("");
      setPassword("");
    }

  } catch (err) {

  setMessage(
    err?.response?.data?.message ||
    "Something went wrong"
  );

  setOpen(true);

}
 };


  return (
   <div className="authContainer">
        <div className="authCard">

            <h1>VoxMeet</h1>
            <p className="welcomeText">
            {
              formState === 0
              ? "Sign in to continue"
              : "Create your account"
            }
            </p>

            {
              formState === 1 &&
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            }
             

            <input
            type="email"
            placeholder="Email Address"
            value={email}
             onChange={(e)=>setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={handleAuth}>
            {
              formState === 0
              ? "Login"
              : "Register"
            }
            </button>
              
            <p className="registerText">
            {
              formState === 0
              ?
              <>
                Don't have an account?

                <span onClick={() => {console.log("clicked"); setFormState(1)}}>
                  Register
                </span>
              </>
              :
              <>
                Already have an account?
                <span onClick={() => setFormState(0)}>
                  Sign In
                </span>
              </>
            }
            </p>

        </div>
        <Snackbar
  open={open}
  autoHideDuration={4000}
  onClose={() => setOpen(false)}
  message={message}
/>
   </div>
  );
} 