import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { getFirestore, collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import './firebase';
import './ScoreboardPage.css';

const ScoreboardPage = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      const db = getFirestore();
      const winnersCollection = collection(db, 'winners');
      const winnersSnapshot = await getDocs(query(winnersCollection, orderBy('time'), limit(10))); // Limiter les résultats aux 3 premiers
      const winnersData = [];
      winnersSnapshot.forEach(doc => {
        const winnerData = doc.data();
        const formattedTimestamp = new Date(winnerData.timestamp.seconds * 1000).toLocaleString(); // Convertir les secondes en millisecondes et formater la date
        winnersData.push({ id: doc.id, time: winnerData.time, timestamp: formattedTimestamp });
      });
      setWinners(winnersData);
    } catch (error) {
      console.error('Error fetching winners:', error);
    }
  };

  return (
    <Container>
      <h1>Classement Du Jour</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Temps (en secondes)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner, index) => (
            <tr key={winner.id} className={index < 3 ? 'podium' : ''}> {/* Appliquer une classe de podium aux trois premières lignes */}
              <td>{winner.id}</td>
              <td>{winner.time}</td>
              <td>{winner.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ScoreboardPage;
