import React from 'react';
import './Register.css';
import CredentialsForm, { View } from '../../Components/СredentialsForm/CredentialsForm';

function Register({ onRegistrate }) {
  return (
    <main className="register">
      <CredentialsForm view={View.Register} onRegistrate={onRegistrate} />
    </main>
  );
}

export default Register;
