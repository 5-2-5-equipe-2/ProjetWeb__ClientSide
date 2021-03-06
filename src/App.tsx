import React, {useState} from 'react';
import './media/css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AccountMenu from "./components/navbar/Navbar";
import {createTheme, Grid, Paper, Theme, ThemeProvider} from "@mui/material";
import UserList from "./components/user/UserList";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserInterface from "./api/User/UserInterface";
import {useQuery} from "react-query";
import {getCurrentlyLoggedInUser} from "./api/User/User";
import Logout from "./pages/Logout";
import ModifyUser from "./pages/ModifyUser";
import Chat from "./pages/Chat";
import "./global.css";
import TestGame from "./pages/TestGame";
import ChatEdit from "./components/chat_room/chat_settings_button/ChatEdit";
import Game from "./api/Game/DinosaurGame";
import ChatCreateTab from "./components/chat_room/chat_add_button/ChatCreateTab";
import ChatRoomAddButton from "./components/chat_room/chat_add_button/ChatRoomAddButton";
import Pixels from "./pages/Pixels";
import ModifyUserPassword from "./pages/ModifyUserPassword";

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
    profile_picture: "",
    date_joined: new Date(),
    last_login: new Date(),
    is_superuser: false,
    next_time_pixel: new Date(),
    pixel_placed: 0
}

let themeContext = React.createContext({
    currentTheme: theme,
    setCurrentTheme: (theme: Theme) => {
        console.log(theme);
    }
});
let loggedInUserContext = React.createContext({
    loggedInUser: nullUser,
    setLoggedInUser: (user: UserInterface) => {
        console.log(user)
    },
});


function App() {
    const [loggedInUser, setLoggedInUser] = useState(nullUser);
    const [currentTheme, setCurrentTheme] = useState(theme);
    let {data, isError} = useQuery("user", async ()=>{
        return (await getCurrentlyLoggedInUser())?.data;
    }, {
        refetchInterval: 1000,
        refetchOnWindowFocus: false,

    });

    // update loggedInUser if data changes
    React.useEffect(() => {
        if (!isError && data) {
            setLoggedInUser(data);
        }
    }, [isError, data]);


    return (
        <Router>
            <loggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
                <themeContext.Provider value={{currentTheme, setCurrentTheme}}>
                    <ThemeProvider theme={currentTheme}>
                        <Paper style={{width: "100wh", height: "100vh"}} elevation={10}>
                            <Grid container
                                  spacing={0}
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-evenly"
                                  style={{
                                      width: "100%",
                                      height: "100%",
                                      // padding:"10px",
                                      //   border: "4px solid"
                                  }}
                            >
                                <Grid item md={8} xs={9}>
                                    <AccountMenu/>
                                </Grid>
                                <Grid item md={12}>
                                    <Grid
                                        container
                                        spacing={0}
                                        direction="column"
                                        alignItems="space-between"
                                        justifyContent="space-evenly"
                                        style={{width: "100%", height: "100%"}}
                                    >
                                        <Routes>
                                            <Route path="/about"/>
                                            <Route path="/contact"/>
                                            <Route path="/userList" element={<UserList/>}/>
                                            <Route path="/login" element={<Login/>}/>
                                            <Route path="/signup" element={<SignUp/>}/>
                                            <Route path="/logout"
                                                   element={<Logout/>}/>
                                            {/*<Route path="/messagetest" element={<MessageBubble messageId={2}/>}/>*/}
                                            <Route path="/chat" element={<Chat/>}/>
                                            {/*<Route path="/chatroomlist" element={<ChatRoomMessageBox/>}/>*/}
                                            <Route path="/modifyuser" element={<ModifyUser/>}/>
                                            <Route path="*" element={<Login/>}/>
                                            <Route path="/testgame" element={<TestGame/>}/>
                                            <Route path="/Game" element={<Game/>}/>
                                            <Route path="/editChatRoom" element={<ChatEdit/>}/>
                                            <Route path="/createChatRoomTest" element={<ChatCreateTab/>}/>
                                            <Route path="/testChatRoomAdd" element={<ChatRoomAddButton/>}/>
                                            <Route path={"/pixels"} element={<Pixels/>}/>
                                            <Route path={"/modifyUserPassword"} element={<ModifyUserPassword/>}/>
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