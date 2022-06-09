import {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    useMediaQuery, useTheme
} from "@mui/material";
import {Add} from "@mui/icons-material";
import ChatRoomAddTabGroup from "./ChatRoomAddTabGroup";

export default function ChatRoomAddButton() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <><IconButton onClick={handleClickOpen}
                      centerRipple
                      sx={{
                          width: '5rem',
                          height: '5rem',
                      }}
        >
            <Add sx={{
                width: '4rem',
                height: '4rem',
                boxShadow: '4rem',
            }}/>
        </IconButton>
            <Dialog
                fullScreen={fullScreen}
                maxWidth={'md'}
                fullWidth={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"ChatRooms"}
                </DialogTitle>
                <DialogContent>
                    <ChatRoomAddTabGroup/>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog></>
    );


}