import React from 'react';
import './media/css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AccountMenu from "./components/Navbar";
import {createTheme, Grid, Paper, ThemeProvider} from "@mui/material";
import UserList from "./components/user/UserList";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {getChatRoomById} from "./api/ChatRoom/ChatRoom";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    console.log(getChatRoomById(1));
    return (
        <Router>
            <ThemeProvider theme={theme}>
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
                            <AccountMenu/>
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
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/signup" element={<SignUp/>}/>
                                    <Route path="*" element={<Login/>}/>

                                </Routes>
                            </Grid>
                        </Grid></Grid>

                </Paper>
            </ThemeProvider>
        </Router>


    );
}

export default App;
