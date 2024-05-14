import React from 'react';
import { Container } from 'react-bootstrap';

const RulesPage = () => {
    return (
        <Container>
            <h1>Règles du Jeu Takuzu</h1>
            <p>Le Takuzu, également connu sous le nom de Binairo, est un casse-tête logique qui consiste à placer deux symboles, des 1 et des 0, sur une grille. Voici les règles du Takuzu : </p>      <ol>
                <li>Chaque ligne et chaque colonne doit contenir un nombre égal de 0 et de 1.</li>
                <li>Il ne peut y avoir plus de deux chiffres identiques adjacents (horizontalement ou verticalement).</li>
                <li>Aucune ligne ou colonne ne peut être identique à une autre.</li>
            </ol>
            <p>Le jeu commence avec quelques cases déjà remplies dans la grille, et le but est de remplir le reste de la grille en respectant ces règles. Les tailles de grille varient généralement de 4x4 à 20x20, mais des puzzles plus grands existent également. Amusez-vous bien ! 😊</p>
        </Container>
    );
};

export default RulesPage;
