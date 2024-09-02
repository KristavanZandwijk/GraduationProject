import React from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RoleBasedButton = ({ roles, buttonText, navigateTo }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // Check if the user has any of the required roles
  const hasRequiredRole = user.role.some(role => roles.includes(role));

  if (!hasRequiredRole) {
    return null;
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate(navigateTo)}
    >
      {buttonText}
    </Button>
  );
};

export default RoleBasedButton;
