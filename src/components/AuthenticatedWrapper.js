import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'; // Importez le hook useAuthState
import { getAuth, signOut } from 'firebase/auth';

const AuthenticatedWrapper = ({ children }) => {
  const [user] = useAuthState(getAuth()); // Récupérez l'état de connexion de l'utilisateur
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('Utilisateur déconnecté');
    }).catch((error) => {
      console.error('Erreur lors de la déconnexion:', error);
    });
  };

  return (
    <>
      {children}
      {user && (
        <div className="authenticated-banner">
          Connecté en tant que : {user.email}
          <button onClick={handleSignOut} className="sign-out-button">
            Déconnexion
          </button>
        </div>
      )}
    </>
  );
};

export default AuthenticatedWrapper;
