import UserInterface from "../api/User/UserInterface";
import {nullUser} from "../App";
import {useMutation} from "react-query";
import {logout} from "../api/User/User";
import {Box, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import image from "./light.png";
import image2 from "./dark.png";
import {useContext} from "react";
import {themeContext} from "../App";

export default function Logout({setLoggedInUser}: { setLoggedInUser: (user: UserInterface) => void }) {
    const theme = useContext(themeContext).currentTheme;
    if (theme.palette.mode === "dark") {
        var im=image2;
    }
    else {
        var im=image;
    }
    // logout page
    setLoggedInUser(nullUser);
    const [userLoggedOut, setUserLoggedOut] = useState(false);
    const {mutate: logoutMutate} = useMutation(logout, {
        onSuccess: () => {
            setUserLoggedOut(true);
        },
        onError: (error: any) => {
            if (error.response) {
                const {data} = error.response;
                // @ts-ignore
                const {error: error1} = data;
                if (error1==="User not logged in") {
                    setUserLoggedOut(true);
                }
            }
        },
        retry: false,
    });
    useEffect(() => {
        logoutMutate();
    }, [logoutMutate]);
    return (
        <Box sx={{width: "100%"}}>
            {(!userLoggedOut) &&
                <CircularProgress/>
            }
            {userLoggedOut &&
                // display logout to user
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <h1>
                    <img src={im}/>
                    </h1>
                </Box>}
                
        </Box>
    );
}