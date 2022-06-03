import {loggedInUserContext, nullUser} from "../App";
import {useMutation} from "react-query";
import {logout} from "../api/User/User";
import image from "./light.png";
import image2 from "./dark.png";
import {themeContext} from "../App";
import {useContext, useEffect, useState} from "react";
import {CircularProgress, Grid} from "@mui/material";
import Box from "@mui/material/Box";

export default function Logout() {
    const theme = useContext(themeContext).currentTheme;
    let im = image;
    if (theme.palette.mode === "dark") {
        im = image2;
    }
    // logout page
    const setLoggedInUser = useContext(loggedInUserContext).setLoggedInUser;
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
                if (error1 === "User not logged in") {
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
                    justifyContent: "center",
                }}>
                    <h1>
                        <img src={im} alt="You've been logged out"/>
                    </h1>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <div>xs=8</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>xs=4</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>xs=4</div>
                        </Grid>
                        <Grid item xs={8}>
                            <div>xs=8</div>
                        </Grid>
                    </Grid>

                </Box>}

        </Box>
    );
}