import { React, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from './components/Header';
import SessionLogin from './components/SessionLogin';
import SessionView from './components/session/SessionView';
import DebugBoardView from "./components/DebugBoardView";
import AdminView from './components/admin/AdminView.jsx';

// FIXME: todo este código asume que solo habrá una sesión con el identificador
// 1, lo cual es una muy buena suposición

function App() {
  const navigate = useNavigate();

  const participantId = localStorage.getItem("participantId");
  const [sessionData, setSessionData] = useState({});

  useEffect(() => {
    if (participantId === null) {
      return;
    }

    const validateParticipantId = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_ORIGIN}/session/1/participants/${participantId}/validate`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ participantId })
        }
      );

      if (response.ok) {
        const data = await response.json();

        setSessionData({
          username: data.username, participantId, sessionId: "1"
        });
        navigate("/session")
      } else {
        localStorage.removeItem("participantId");
      }
    }

    validateParticipantId();


  }, [participantId]);

  const joinSession = (username, participantId, sessionId) => {
    setSessionData({
      username, participantId, sessionId
    });
    localStorage.setItem("participantId", participantId);
    navigate("/session");
  };
  const leaveSession = () => {
    navigate('/');
  };

  return (
    <>
      <Header
        username={sessionData.username}
        onLeaveClick={leaveSession}
      />
      <Routes>
        <Route exact path="/" element={
          <SessionLogin
            username={sessionData.username}
            onJoinSession={joinSession}
          />
        } />
        <Route path="/session" element={
          (!sessionData.sessionId || !participantId) ? (
            // User not logged in
            <Navigate to='/' />
          ) : (
            <SessionView
              sessionId={sessionData.sessionId}
              participantId={participantId}
              onLeave={leaveSession}
            />
          )
        } />
        <Route path="/debug" element={<DebugBoardView />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </>
  )
}

export default App;
