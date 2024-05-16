import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'; // Importez le hook useAuthState
import { getAuth } from 'firebase/auth';
import './AuthenticatedWrapper.css';

const AuthenticatedWrapper = ({ children }) => {
  const [user] = useAuthState(getAuth()); // Récupérez l'état de connexion de l'utilisateur

  return (
    <>
      {children}
      {user && (
        <div className="authenticated-banner">
          Connecté en tant que : {user.email}
        </div>
      )}
    </>
  );
};

export default AuthenticatedWrapper;
