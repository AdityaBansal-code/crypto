import * as React from 'react';
import {
  Box,
  Button,
  Modal,
  Tabs,
  Tab,
  Typography,
  useTheme,
} from '@mui/material';
import Login from './Login';
import Signup from './Signup';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: '#1e1e1e',
  borderRadius: '16px',
  boxShadow: 24,
  p: 3,
};

// Accessibility props
function a11yProps(index) {
  return {
    id: `auth-tab-${index}`,
    'aria-controls': `auth-tabpanel-${index}`,
  };
}

// Tab panel
function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          width: 100,
          height: 40,
          fontWeight: 'bold',
          backgroundColor: '#eebc1d',
          '&:hover': {
            backgroundColor: '#f3cd45',
          },
        }}
      >
        Login
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: 'flex',
              borderRadius: '10px',
              overflow: 'hidden',
              bgcolor: '#2e2e2e',
              mb: 2,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              sx={{
                width: '100%',
                '& .MuiTab-root': {
                  fontWeight: 600,
                  color: '#bbb',
                  textTransform: 'none',
                  fontSize: '1rem',
                },
                '& .Mui-selected': {
                  backgroundColor: '#EEBC1D',
                  color: '#000',
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab label="LOGIN" {...a11yProps(0)} />
              <Tab label="SIGN UP" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <Login handleClose={handleClose} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Signup handleClose={handleClose} />
          </CustomTabPanel>
        </Box>
      </Modal>
    </div>
  );
}
