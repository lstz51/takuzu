import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './firebase';

const AuthentificationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Pour basculer entre l'inscription et la connexion
    const [errorMessage, setErrorMessage] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [isResettingPassword, setIsResettingPassword] = useState(false);


    const auth = getAuth();
    const navigate = useNavigate(); // Initialisation de useHistory

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            // Vérifier si l'adresse e-mail est valide
            if (!isValidEmail(email)) {
                setErrorMessage('Veuillez entrer une adresse e-mail valide.');
                return;
            }
            // Vérifier si le mot de passe répond aux critères requis
            if (!isValidPassword(password)) {
                setErrorMessage('Le mot de passe doit comporter au moins 12 caractères avec au moins quatre types de caractères différents : majuscules, minuscules, chiffres et caractères spéciaux.');
                return;
            }
            // Vérifier si les mots de passe correspondent lors de l'inscription
            if (!isLogin && password !== confirmPassword) {
                setErrorMessage('Les mots de passe ne correspondent pas.');
                return;
            }
            // Authentification
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/');
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(userCredential.user);
                setErrorMessage('Un e-mail de vérification a été envoyé. Veuillez vérifier votre boîte de réception.');
                // navigate('/') peut être commenté ou supprimé pour forcer la vérification avant la connexion
            }
        } catch (error) {
            console.error('Erreur d\'authentification :', error);
            setErrorMessage(error.message);
        }
    };    

    // Fonction pour vérifier si l'adresse e-mail est valide
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Fonction pour vérifier si le mot de passe répond aux critères requis
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setErrorMessage('Un e-mail de réinitialisation a été envoyé.');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    

    return (
        <Container>
            <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>
            {isResettingPassword ? (
                <>
                    <Form>
                        <Form.Group className="mb-3" controlId="formResetEmail">
                            <Form.Label>Adresse e-mail</Form.Label>
                            <Form.Control type="email" placeholder="Entrez votre e-mail" value={resetEmail} onChange={(e) => {
                                setResetEmail(e.target.value);
                                setErrorMessage('');
                            }} />
                        </Form.Group>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <Button variant="primary" onClick={handlePasswordReset}>
                            Réinitialiser le mot de passe
                        </Button>
                        <Button variant="secondary" onClick={() => setIsResettingPassword(false)}>
                            Retour
                        </Button>
                    </Form>
                </>
            ) : (
                <Form onSubmit={handleAuth}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Adresse e-mail</Form.Label>
                        <Form.Control type="email" placeholder="Entrez votre e-mail" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMessage('');
                        }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <div className="password-input">
                            <Form.Control type={isPasswordVisible ? 'text' : 'password'} placeholder="Entrez votre mot de passe" value={password} onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorMessage('');
                            }} />
                            <i className={`bi bi-eye${isPasswordVisible ? '-slash' : ''} password-icon`} onClick={() => setIsPasswordVisible(!isPasswordVisible)}></i>
                        </div>
                    </Form.Group>
                    {!isLogin && (
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirmer le mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Confirmez votre mot de passe" value={confirmPassword} onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrorMessage('');
                            }} />
                        </Form.Group>
                    )}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <Button variant="primary" type="submit">
                        {isLogin ? 'Se connecter' : 'S\'inscrire'}
                    </Button>
                    <Button variant="secondary" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Créer un compte' : 'Se connecter avec un compte existant'}
                    </Button>
                    {isLogin && (
                        <Button variant="link" onClick={() => setIsResettingPassword(true)}>
                            Mot de passe oublié ?
                        </Button>
                    )}
                </Form>
            )}
        </Container>
    );
    
};

export default AuthentificationPage;
