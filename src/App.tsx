import React, { useState} from 'react';
import './media/css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AccountMenu from "./components/Navbar";
import {createTheme, Grid, Paper, Theme, ThemeProvider} from "@mui/material";
import UserList from "./components/user/UserList";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserInterface from "./api/User/UserInterface";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

let nullUser: UserInterface = {
    id: -1,
    username: "",
    firstname: "",
    surname: "",
    email: "",
    isActive: false,
    profilePicture: "",
    dateJoined: new Date(),
    lastLogin: new Date(),
}

let themeContext = React.createContext({
    currentTheme: theme,
    setCurrentTheme: (theme: Theme) => {
    }
});
let loggedInUserContext = React.createContext({
    loggedInUser: nullUser,
    setLoggedInUser: (user: UserInterface) => {
    }
});


function App() {
    const [loggedInUser, setLoggedInUser] = useState(nullUser);
    const [currentTheme, setCurrentTheme] = useState(theme);
    return (
        <Router>
            <loggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
                <themeContext.Provider value={{currentTheme, setCurrentTheme}}>
                    <ThemeProvider theme={currentTheme}>
                        <Paper style={{width: "100wh", height: "100vh"}}>
                            <Grid container
                                  spacing={0}
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="center"
                                  style={{
                                      height: '100vh',
                                      width: '100wh'
                                  }}
                            >
                                <Grid item md={8} xs={9}>
                                    <AccountMenu currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}/>
                                </Grid>
                                <Grid item md={8}>
                                    <Grid
                                        container
                                        spacing={0}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        style={{minHeight: '80vh'}}
                                    >
                                        <Routes>
                                            <Route path="/about"/>
                                            <Route path="/contact"/>
                                            <Route path="/userList" element={<UserList/>}/>
                                            <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
                                            <Route path="/signup" element={<SignUp/>}/>
                                            <Route path="*" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
                                        </Routes>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Paper>
                    </ThemeProvider>
                </themeContext.Provider>
            </loggedInUserContext.Provider>
        </Router>


    );
}

export default App;
