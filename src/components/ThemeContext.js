import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import app from './firebase';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const firestore = getFirestore(app);
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.darkMode !== undefined) {
            setDarkMode(userData.darkMode);
            document.body.classList.toggle('dark-mode', userData.darkMode);
          }
        }
      } else {
        const localDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(localDarkMode);
        document.body.classList.toggle('dark-mode', localDarkMode);
      }
    });
  }, []);

  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
    if (currentUser) {
      const firestore = getFirestore(app);
      await setDoc(doc(firestore, 'users', currentUser.uid), { darkMode: newDarkMode }, { merge: true });
    } else {
      localStorage.setItem('darkMode', newDarkMode);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
