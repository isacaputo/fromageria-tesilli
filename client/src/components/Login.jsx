import { useState, useContext } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import  AuthContext  from "../contexts/AuthContext";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function Login() {

  //auth is an object that contains user, login and logout
const auth = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: credentials,
      });

      //store it locally
      localStorage.setItem("token", data.token);
      auth.login();
      // console.log(data.message, data.token);
      setData(data.message);
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  const logout = () => {
    auth.logout();
    localStorage.removeItem("token");
  };

  

  return (
    <div>
      <div>
        {auth.user === false &&
        <div>
        <div> if you are the admin, please log in</div>
        <Grid container spacing={2}>
        <Grid item xs={6}>
        <TextField
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          variant="standard"
          placeholder="username"
        />
        </Grid>
        <Grid item sx={6}>
        <TextField
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          variant="standard"
          placeholder="password"
        />
        </Grid>
        </Grid>
      
        </div>
        }
<br></br>
        <div className="d-flex gap-2 justify-content-center">
          {auth.user === false && <Button variant="contained" onClick={login}>
            Log in
          </Button>
          }
          {auth.user === true &&
          <div>
          <Button variant="contained" onClick={logout}>
            Log out
          </Button>
          <Typography>Welcome Admin! Navigate the menu above to make changes</Typography>
          </div>
          }
        </div>
      </div>
      

      
    </div>
  );
}

export default Login;