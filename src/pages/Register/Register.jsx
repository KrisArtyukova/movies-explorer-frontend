import React from 'react';
import './Register.css';
import CredentialsForm, { View } from '../../Components/СredentialsForm/CredentialsForm';

function Register() {
  return (
    <section className="register">
      <CredentialsForm view={View.Register} />
    </section>
  );
}

export default Register;
