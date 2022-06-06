import {Box, Tab} from "@mui/material";
import JoinChatRoomByURLTab from "./JoinChatRoomByURLTab";
import ChatCreateTab from "./ChatCreateTab";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from "react";

export default function ChatRoomAddTabGroup() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Join ChatRoom by URL" value="1"/>
                        <Tab label="Create ChatRoom" value="2"/>
                        <Tab label="Join public ChatRooms" value="3"/>
                    </TabList>
                </Box>
                <TabPanel value="1"><JoinChatRoomByURLTab/> </TabPanel>
                <TabPanel value="2"><ChatCreateTab/></TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
    );

}