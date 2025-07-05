import { Box, Button, TextField } from '@mui/material';
import { useState } from "react";
import useCryptoStore from '../../Store/CryptoStore';
import { signInWithEmailPassword } from '../../Config/AuthServices';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAlert} = useCryptoStore();

  const handleSubmit = async () => {
     if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
     }
    

  try {
    const result = await signInWithEmailPassword(email, password);
    setAlert({
      open: true,
      message: `Login Successful. Welcome ${result.user.email}`,
      type: "success",
    });
    handleClose();
  } catch (error) {
    setAlert({
      open: true,
      message: error.message || "Login Failed",
      type: "error",
    });
  }
};

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "#EEBC1D" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
