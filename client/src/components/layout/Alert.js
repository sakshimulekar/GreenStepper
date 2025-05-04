import React from 'react';
import { Alert as MuiAlert, Snackbar } from '@mui/material';
import { useAlert } from '../../context/AlertContext';

const Alert = () => {
  const { alerts, removeAlert } = useAlert();

  const handleClose = (id) => {
    removeAlert(id);
  };

  return (
    <>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => handleClose(alert.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            onClose={() => handleClose(alert.id)}
            severity={alert.alertType}
            sx={{ width: '100%' }}
          >
            {alert.msg}
          </MuiAlert>
        </Snackbar>
      ))}
    </>
  );
};

export default Alert; 