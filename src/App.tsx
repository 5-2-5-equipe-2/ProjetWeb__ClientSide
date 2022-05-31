import React, {useState} from 'react';
import './media/css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AccountMenu from "./components/Navbar";
import {createTheme, Grid, Paper, Theme, ThemeProvider} from "@mui/material";
import UserList from "./components/user/UserList";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserInterface from "./api/User/UserInterface";
import {useQuery} from "react-query";
import {getCurrentlyLoggedInUser} from "./api/User/User";
import Logout from "./pages/Logout";
import MessageBubble from "./components/MessageBubble";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

let nullUser: UserInterface = {
    id: -1,
    username: "",
    first_name: "",
    surname: "",
    email: "",
    is_active: false,
    profile_picture: "",
    date_joined: new Date(),
    last_login: new Date(),
}

let themeContext = React.createContext({
    currentTheme: theme,
    setCurrentTheme: (theme: Theme) => {
    }
});
let loggedInUserContext = React.createContext({
    loggedInUser: nullUser,
    setLoggedInUser: (user: UserInterface) => {
    },
});


function App() {
    const [loggedInUser, setLoggedInUser] = useState(nullUser);
    const [currentTheme, setCurrentTheme] = useState(theme);
    let {data, isError, refetch} = useQuery("user", getCurrentlyLoggedInUser, {
        refetchInterval: 1000,
        retry: false,
        enabled: true,
    });

    // update loggedInUser if data changes
    React.useEffect(() => {
        if (!isError && data) {
            setLoggedInUser(data.data);
        }
    }, [isError, data]);


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
                                            <Route path="/logout"
                                                   element={<Logout setLoggedInUser={setLoggedInUser}/>}/>
                                            <Route path="/messagetest" element={<MessageBubble messageId={1}/>}/>
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

export {App, themeContext, loggedInUserContext, nullUser};
export default App;