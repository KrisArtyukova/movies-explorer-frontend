import React from 'react';
import './Login.css';
import CredentialsForm, { View } from '../../Components/СredentialsForm/CredentialsForm';

function Login() {
  return (
    <section className="login">
      <CredentialsForm view={View.Login} />
    </section>

  );
}

export default Login;
