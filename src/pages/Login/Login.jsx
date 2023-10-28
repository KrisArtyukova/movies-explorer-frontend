import React from 'react';
import './Login.css';
import CredentialsForm, { View } from '../../Components/СredentialsForm/CredentialsForm';

function Login() {
  return (
    <main className="login">
      <CredentialsForm view={View.Login} />
    </main>

  );
}

export default Login;
