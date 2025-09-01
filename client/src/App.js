import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { SERVER_URL } from "./api";
import { connectSocket, socket as ioSocket } from "./socket";
import "./styles.css";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Summary from "./pages/Summary";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
function AppRoutes() {
    const [view, setView] = useState("home");
    const [me, setMe] = useState({
        id: "",
        name: "",
    });
    const [room, setRoom] = useState(null);
    const [toast, setToast] = useState("");
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
        if (!room)
            return;
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
        }
        catch { }
        try {
            localStorage.removeItem("wikirace:lastScores");
        }
        catch { }
        setRoom(null);
        setMe({ id: "", name: "" });
        setToast("");
        setupSocket();
        navigate("/");
    };
    return (_jsx("div", { children: _jsxs("div", { className: "max-w-6xl mx-auto p-6", children: [toast && (_jsx("div", { className: "rounded border border-[#a2c6ff] bg-[#eaf3ff] text-[#202122] px-4 py-3", children: toast })), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, { onCreate: () => navigate("/create"), onJoin: () => navigate("/join") }) }), _jsx(Route, { path: "/create", element: _jsx(CreateRoom, { me: me, onNamed: (name) => setMe({ ...me, name }) }) }), _jsx(Route, { path: "/join", element: _jsx(JoinRoom, { me: me, onNamed: (name) => setMe({ ...me, name }) }) }), _jsx(Route, { path: "/lobby", element: room ? (_jsx(Lobby, { me: me, room: room })) : (_jsx(Home, { onCreate: () => navigate("/create"), onJoin: () => navigate("/join") })) }), _jsx(Route, { path: "/game", element: room ? (_jsx(Game, { me: me, room: room })) : (_jsx(Home, { onCreate: () => navigate("/create"), onJoin: () => navigate("/join") })) }), _jsx(Route, { path: "/summary", element: room ? (_jsx(Summary, { room: room, onBackHome: handleBackHome })) : (_jsx(Home, { onCreate: () => navigate("/create"), onJoin: () => navigate("/join") })) })] })] }) }));
}
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AppRoutes, {}) }));
}
