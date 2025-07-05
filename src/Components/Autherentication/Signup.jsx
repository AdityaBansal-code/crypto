import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import useCryptoStore from "../../Store/CryptoStore";
import { signUpWithEmailPassword } from "../../Config/AuthServices";

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert, setUser } = useCryptoStore();

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      return setAlert({
        open: true,
        message: "Please fill all fields",
        type: "error",
      });
    }

    if (password !== confirmPassword) {
      return setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
    }

    try {
      const result = await signUpWithEmailPassword(email, password);
      setUser(result.user);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
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
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant="contained"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
