import {Menu} from "@mui/material";
import * as React from "react";
import ChatEdit from "./ChatEdit";
import ChatRoomLeaveMenuItem from "./ChatRoomLeaveMenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";


export const ChatEditButton = () => {


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <Tooltip title="Account Menu" style={{marginLeft: "auto"}}>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ml: 2}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <MoreVertIcon/>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    // sx: {
                    //     overflow: 'visible',
                    //     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    //     mt: 1.5,
                    //     '& .MuiAvatar-root': {
                    //         width: 32,
                    //         height: 32,
                    //         ml: -0.5,
                    //         mr: 1,
                    //     },
                    //     '&:before': {
                    //         content: '""',
                    //         display: 'block',
                    //         position: 'absolute',
                    //         top: 0,
                    //         right: 14,
                    //         width: 10,
                    //         height: 10,
                    //         bgcolor: 'background.paper',
                    //         transform: 'translateY(-50%) rotate(45deg)',
                    //         zIndex: 0,
                    //     },
                    // },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <ChatEdit/>
                <ChatRoomLeaveMenuItem/>
            </Menu></>)
}


export default ChatEditButton;