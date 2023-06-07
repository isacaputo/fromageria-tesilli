import { useState, useContext } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import  AuthContext  from "../contexts/AuthContext";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

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
      
    } catch (error) {
      console.log(error);
      
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
          <Grid container spacing={5}>
          <Grid item xs={12} sm={12}>
           <Box textAlign="center"> 
        <Typography variant="h6" gutterBottom>
          Welcome to Fromagergia Tesilli Admin</Typography>
          </Box> 
        </Grid>
        {/* <Grid container spacing={5}> */}
        <Grid item xs={12} sm={6}>
        <TextField
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          fullWidth
          variant="standard"
          placeholder="username"
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          variant="standard"
          fullWidth
          placeholder="password"
        />
        </Grid>
        </Grid>
      
        </div>
        }
<br></br>
        <Grid container>
         <Grid item tem xs={12}>
          <Box textAlign="center">
        <div>
          {auth.user === false && <Button variant="contained" onClick={login}>
            Log in
          </Button>
          }
          {auth.user === true &&
          <div>
            <Typography variant="h6" gutterBottom>Welcome Admin! Navigate the menu above to make changes</Typography>
          <Button variant="contained" onClick={logout}>
            Log out
          </Button>
          </div>
          }
        </div>
        </Box>
        </Grid> 
        </Grid>
      </div>
      

      
    </div>
  );
}

export default Login;