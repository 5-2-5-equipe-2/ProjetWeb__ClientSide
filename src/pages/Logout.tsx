import UserInterface from "../api/User/UserInterface";
import {nullUser} from "../App";
import {useMutation} from "react-query";
import {logout} from "../api/User/User";
import {Box, CircularProgress, Grid} from "@mui/material";
import {useEffect, useState} from "react";

export default function Logout({setLoggedInUser}: { setLoggedInUser: (user: UserInterface) => void }) {
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
                        You have been logged out
                        
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