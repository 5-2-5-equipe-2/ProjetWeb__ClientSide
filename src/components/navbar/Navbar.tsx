import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Button, createTheme, FormControlLabel, FormGroup, Switch, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {loggedInUserContext, themeContext} from "../../App";
import {Password} from "@mui/icons-material";
// import "../media/css/navbar.css";

export default function AccountMenu() {

    const currentTheme = useContext(themeContext).currentTheme;
    const setCurrentTheme = useContext(themeContext).setCurrentTheme;
    const isDarkTheme = currentTheme.palette.mode === 'dark';
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const userData = useContext(loggedInUserContext);
    const isLoggedIn = userData.loggedInUser.id !== -1;
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <FormGroup>
                    <FormControlLabel control={<Switch onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            if (event.target.checked) {
                                setCurrentTheme(createTheme({
                                    palette: {
                                        mode: 'dark',
                                    },
                                }));
                            } else {
                                setCurrentTheme(createTheme({
                                    palette: {
                                        mode: 'light',
                                    }
                                }));
                            }
                        }
                    } defaultChecked={isDarkTheme ?? true}/>} label="Dark mode"/>
                </FormGroup>
                <Button sx={{minWidth: 100}} color={"secondary"} component={Link} to="/Login">Login</Button>
                <Button sx={{minWidth: 100}} component={Link} to="/signup">Sign Up</Button>
                <Button sx={{minWidth: 100}} component={Link} to="/chat">Home</Button>

                {isLoggedIn &&
                    <Typography color="primary" style={{marginLeft: "auto"}}>
                        Logged in as, {userData.loggedInUser.username}
                    </Typography>}

                <Tooltip title="Account Menu" style={{marginLeft: "auto"}}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{width: 32, height: 32}}/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem component={Link} to={'/modifyuser'}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Edit Profile
                </MenuItem>
                <Divider/>
                <MenuItem component={Link} to={'/ModifyUserPassword'}>
                    <ListItemIcon>
                        <Password fontSize="small"/>
                    </ListItemIcon>
                    Change Password
                </MenuItem>
                <MenuItem  component={Link} to={'/logout'}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
