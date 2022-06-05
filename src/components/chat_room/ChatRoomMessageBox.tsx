import Box from "@mui/material/Box";
import {useQuery} from "react-query";
import {getChatRoomMessages} from "../../api/ChatRoom/ChatRoom";
import MessageBubble from "../MessageBubble";
import {CircularProgress, Grid, Paper} from "@mui/material";
import {selectedChatRoomContext} from "../../pages/Chat";
import React, {useContext, useEffect, useRef, useState} from "react";
import MessageInterface from "../../api/Message/MessageInterface";
// import {VariableSizeList as List} from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
import {List} from "@mui/material"

export default function ChatRoomMessageBox({
                                               isMessagesLoading,
                                               messageData,
                                           }: { isMessagesLoading: boolean, messageData: MessageInterface[] }) {

    let chatRoomId = useContext(selectedChatRoomContext).selectedChatRoom?.id;
    const rowHeights = useRef([] as number[]);

    function getRowHeight(index: number) {
        return rowHeights.current[index] + 8 || 150;
    }

    const listRef = useRef(null);

    useEffect(() => {
        if (messageData.length > 0) {
            scrollToBottom();
        }
        // eslint-disable-next-line
    }, [messageData, chatRoomId]);

    function setRowHeight(index: number, size: number) {
        // @ts-ignore
        listRef.current.resetAfterIndex(0);
        rowHeights.current = {...rowHeights.current, [index]: size};
    }

    function scrollToBottom() {
        // @ts-ignore
        // listRef.current.scrollToItem(messageData.length - 1, "end");
    }

    function Row({index, style}: { index: number, style: any }) {
        const rowRef = useRef(null);

        useEffect(() => {
            if (rowRef.current) {
                // @ts-ignore
                setRowHeight(index, rowRef.current.clientHeight);
            }
            // eslint-disable-next-line
        }, [rowRef]);

        return (
            <div style={style}>
                <div ref={rowRef}><MessageBubble message={messageData[index]}/></div>
            </div>
        );
    }


    return (
        <Box
            height="100%"
            width="100%"
        ><Paper elevation={5}
                style={{
                    height: "100%",
                    width: "100%",
                }}
        >
            <Box sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center"
            }}>
                {isMessagesLoading &&
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <CircularProgress/>
                    </Box>
                }
                <List sx={{maxHeight: '100%', overflow: 'auto', width: "70vw"}}>
                    {messageData.length > 0 &&
                        <>
                            {messageData.map((message) => (
                                <MessageBubble message={message} key={message.id}/>
                            ), [messageData])}
                        </>}
                </List>

                {/*<AutoSizer style={ {width:"100%", height:"100%"}}>*/}
                {/*    {({ height, width }:{height:number, width:number}) => (*/}
                {/*<List*/}
                {/*    className="List"*/}
                {/*    height={height - 8}*/}
                {/*    itemCount={messageData.length}*/}
                {/*    itemSize={getRowHeight}*/}
                {/*    ref={listRef}*/}
                {/*    width={width - 8}*/}
                {/*>*/}
                {/*    {Row}*/}
                {/*</List>*/}
                {/*    )}*/}
                {/*</AutoSizer>*/}

                {/*</List>*/}
            </Box>
        </Paper>
        </Box>
    );

}