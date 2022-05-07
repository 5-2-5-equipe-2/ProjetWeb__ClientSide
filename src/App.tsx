import React from 'react';
import './media/css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AccountMenu from "./components/Navbar";
import {createTheme, Grid, ThemeProvider} from "@mui/material";
import UserList from "./components/user/UserList";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// import UserList from "./components/user/UserList";
const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{minHeight: '100vh'}}
                >
                    <AccountMenu/>
                    <Router>
                        <Routes>
                            <Route path="/about"/>
                            <Route path="/contact"/>
                            <Route path="/userList" element={<UserList/>}/>

                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                            <Route path="*" element={<Login/>}/>
                        </Routes>
                    </Router>
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default App;
