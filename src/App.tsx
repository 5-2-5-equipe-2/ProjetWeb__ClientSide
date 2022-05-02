import React from 'react';
import './media/css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import UserList from "./components/user/UserList";

function App() {
    return (
        <div className="App fill-window">
            <Navbar/>
            <Router>
                <Routes>
                    <Route path="/"/>
                    <Route path="/about"/>
                    <Route path="/contact"/>
                    <Route path="/userList" element={<UserList/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
