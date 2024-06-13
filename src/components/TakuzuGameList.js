import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { getFirestore, collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebase';
import takuzuData from '../data/takuzuData.json';

const TakuzuGameList = ({ isDaily }) => {
  const [board, setBoard] = useState([]);
  const [winner, setWinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [pseudo, setPseudo] = useState("");
  const [winnerDocId, setWinnerDocId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    importTakuzu();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const getCurrentPuzzleId = () => {
    if (isDaily) {
      const currentDate = new Date();
      const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
      return dayOfYear;
    } else {
      return parseInt(id) - 1; // Convert from 1-based to 0-based index
    }
  };

  const importTakuzu = () => {
    const puzzleId = getCurrentPuzzleId();
    const takuzuIndex = puzzleId % takuzuData.takuzu.length;
    const initialBoard = takuzuData.takuzu[takuzuIndex];
    const newBoard = Object.values(initialBoard).map(row =>
      row.split('').map(cell => ({
        value: cell === '-' ? null : parseInt(cell),
        isAutoGenerated: cell !== '-'
      }))
    );
    setBoard(newBoard);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (!winner) {
      if (!timerStarted) {
        startTimer();
      }
      const newBoard = [...board];
      const cell = newBoard[rowIndex][colIndex];
      if (!cell.isAutoGenerated) {
        const newValue = cell.value === null ? 0 : cell.value === 0 ? 1 : null;
        newBoard[rowIndex][colIndex] = { value: newValue, isAutoGenerated: false, isManual: true };
        setBoard(newBoard);
        if (checkWinner(newBoard)) {
          setWinner(true);
          setShowModal(true);
          stopTimer();
          if (isDaily) {
            saveWinnerTime(elapsedTime);
          }
        }
      }
    }
  };

  const checkNoThreeConsecutive = (array) => {
    for (let i = 0; i < array.length - 2; i++) {
      if (array[i] !== null && array[i] === array[i + 1] && array[i] === array[i + 2]) {
        return false;
      }
    }
    return true;
  };

  const checkEqualNumberOfSymbols = (array) => {
    const zeros = array.filter(value => value === 0).length;
    const ones = array.filter(value => value === 1).length;
    return zeros === ones;
  };

  const checkUniqueRowsAndColumns = (board) => {
    const rows = board.map(row => row.map(cell => cell.value).join(''));
    const columns = board[0].map((_, colIndex) => board.map(row => row[colIndex].value).join(''));
    const uniqueRows = new Set(rows);
    const uniqueColumns = new Set(columns);
    return uniqueRows.size === rows.length && uniqueColumns.size === columns.length;
  };

  const checkWinner = (currentBoard) => {
    const flatBoard = currentBoard.flat();
    const isBoardFull = flatBoard.every(cell => cell.value !== null);
    if (isBoardFull) {
      for (let i = 0; i < currentBoard.length; i++) {
        if (!checkNoThreeConsecutive(currentBoard[i]) || !checkEqualNumberOfSymbols(currentBoard[i])) {
          return false;
        }
      }
      for (let i = 0; i < currentBoard.length; i++) {
        const column = currentBoard.map(row => row[i]);
        if (!checkNoThreeConsecutive(column) || !checkEqualNumberOfSymbols(column)) {
          return false;
        }
      }
      if (!checkUniqueRowsAndColumns(currentBoard)) {
        return false;
      }
      return true;
    }
    return false;
  };

  const handleReset = () => {
    importTakuzu();
    setWinner(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (isDaily) {
      navigate('/scoreboard');
    } else {
      navigate('/');
    }
  };

  const startTimer = () => {
    setTimerStarted(true);
    const timer = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  };

  const stopTimer = () => {
    setTimerStarted(false);
  };

  const saveWinnerTime = async (time) => {
    const firestore = getFirestore(app);
    const puzzleId = getCurrentPuzzleId();
    try {
      const docRef = await addDoc(collection(firestore, "winners"), {
        time: time,
        pseudo: currentUser ? "anonymous" : "anonymous",
        timestamp: serverTimestamp(),
        puzzleId: puzzleId
      });
      console.log("Winner time saved with ID: ", docRef.id);
      setWinnerDocId(docRef.id); // Store the document ID to update later
    } catch (error) {
      console.error("Error adding winner time: ", error);
    }
  };

  const handleSavePseudo = async () => {
    if (currentUser && winnerDocId) {
      const firestore = getFirestore(app);
      try {
        const winnerDoc = doc(firestore, "winners", winnerDocId);
        await updateDoc(winnerDoc, {
          pseudo: pseudo || "anonymous"
        });
        console.log("Pseudo updated for document ID: ", winnerDocId);
      } catch (error) {
        console.error("Error updating pseudo: ", error);
      }
    }
    handleCloseModal();
  };

  return (
    <Container>
      <h1>{isDaily ? 'Takuzu Du Jour' : `Takuzu ${parseInt(id)}`}</h1>
      <div>Temps écoulé: {elapsedTime} secondes</div>
      <Button onClick={handleReset}>Réinitialiser</Button>
      <Row>
        {board.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Col key={colIndex} onClick={() => handleCellClick(rowIndex, colIndex)}>
                <div className={`cell ${cell.value === null ? 'empty' : cell.value === 0 ? 'cell-zero' : 'cell-one'} ${cell.isAutoGenerated ? 'cell-auto' : 'cell-manual'}`}>
                  {cell.value !== null && cell.value}
                </div>
              </Col>
            ))}
          </Row>
        ))}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Félicitations !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Vous avez gagné en {elapsedTime} secondes !</p>
          {isDaily && currentUser && (
            <Form.Group controlId="formPseudo">
              <Form.Label>Entrez votre pseudo :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isDaily ? (
            <Button variant="primary" onClick={handleSavePseudo}>
              Enregistrer le score
            </Button>
          ) : (
            <Button variant="primary" onClick={handleCloseModal}>
              Retour au menu
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TakuzuGameList;
