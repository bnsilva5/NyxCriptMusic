import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import CallbackHandler from "./components/CallbackHandler";
import HomeLogin from "./components/HomeLogin";
import HomeUser from "./components/HomeUser";
import Playlists from "./components/Playlists";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home-login" />} />
                <Route path="/home-login" element={<HomeLogin />} />
                <Route path="/home-user" element={<HomeUser />} />
                <Route path="/auth/callback" element={<CallbackHandler />} />
                <Route path="/user_playlists" element={<Playlists/>}/>
            </Routes>
        </Router>
    );
};

export default App;
