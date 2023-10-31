import React from 'react';
import './Login.css';
import CredentialsForm, { View } from '../../Components/СredentialsForm/CredentialsForm';

function Login({ onLogin }) {
  return (
    <main className="login">
      <CredentialsForm view={View.Login} onLogin={onLogin} />
    </main>

  );
}

export default Login;
