import React, { useEffect, useState } from "react";
import { SERVER_URL } from "./api";
import { connectSocket, socket as ioSocket } from "./socket";
import type { PublicRoomState } from "./types";
import "./styles.css";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Summary from "./pages/Summary";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function AppRoutes() {
  const [view, setView] = useState<
    "home" | "create" | "join" | "lobby" | "game" | "summary"
  >("home");
  const [me, setMe] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const [room, setRoom] = useState<PublicRoomState | null>(null);
  const [toast, setToast] = useState<string>("");
  const navigate = useNavigate();

  // Establish a socket connection and wire listeners
  const setupSocket = () => {
    const s = connectSocket(SERVER_URL);
    s.on("connect", () => setMe((m) => ({ ...m, id: s.id || "" })));
    s.on("room:state", setRoom);
    s.on("room:error", setToast);
    return s;
  };

  useEffect(() => {
    const s = setupSocket();
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!room) return;
    // If last round is over, go to summary even though status is round_over
    if (room.status === "round_over" && room.currentRound >= room.rounds) {
      navigate("/summary");
      return;
    }
    if (room.status === "finished") {
      navigate("/summary");
      return;
    }
    if (room.status === "lobby" || room.status === "round_over") {
      navigate("/lobby");
      return;
    }
    if (room.status === "countdown" || room.status === "playing") {
      navigate("/game");
      return;
    }
  }, [room]);

  const handleBackHome = () => {
    try {
      ioSocket?.disconnect();
    } catch {}
    try {
      localStorage.removeItem("wikirace:lastScores");
    } catch {}
    setRoom(null);
    setMe({ id: "", name: "" });
    setToast("");
    setupSocket();
    navigate("/");
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="max-w-6xl mx-auto p-6">
        {toast && (
          <div className="rounded border border-[#a2c6ff] bg-[#eaf3ff] text-[#202122] px-4 py-3">
            {toast}
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onCreate={() => navigate("/create")}
                onJoin={() => navigate("/join")}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateRoom me={me} onNamed={(name) => setMe({ ...me, name })} />
            }
          />
          <Route
            path="/join"
            element={
              <JoinRoom me={me} onNamed={(name) => setMe({ ...me, name })} />
            }
          />
          <Route
            path="/lobby"
            element={
              room ? (
                <Lobby me={me} room={room} />
              ) : (
                <Home
                  onCreate={() => navigate("/create")}
                  onJoin={() => navigate("/join")}
                />
              )
            }
          />
          <Route
            path="/game"
            element={
              room ? (
                <Game me={me} room={room} />
              ) : (
                <Home
                  onCreate={() => navigate("/create")}
                  onJoin={() => navigate("/join")}
                />
              )
            }
          />
          <Route
            path="/summary"
            element={
              room ? (
                <Summary room={room} onBackHome={handleBackHome} />
              ) : (
                <Home
                  onCreate={() => navigate("/create")}
                  onJoin={() => navigate("/join")}
                />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
