import React from 'react';
import './Register.css';
import CredentialsForm, { View } from '../../Components/СredentialsForm/CredentialsForm';

function Register() {
  return (
    <main className="register">
      <CredentialsForm view={View.Register} />
    </main>
  );
}

export default Register;
