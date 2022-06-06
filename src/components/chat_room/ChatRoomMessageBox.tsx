import Box from "@mui/material/Box";
import {useInfiniteQuery, useQuery} from "react-query";
import {getChatRoomMessages} from "../../api/ChatRoom/ChatRoom";
import MessageBubble from "../MessageBubble";
import {CircularProgress, Grid, Paper} from "@mui/material";
import {selectedChatRoomContext} from "../../pages/Chat";
import React, {useContext, useEffect, useRef, useState} from "react";
import MessageInterface from "../../api/Message/MessageInterface";
// import {VariableSizeList as List} from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
import {List} from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component";

export default function ChatRoomMessageBox({
                                               isMessagesLoading,
                                               messageData,
                                           }: { isMessagesLoading: boolean, messageData: MessageInterface[] }) {

    let chatRoomId = useContext(selectedChatRoomContext).selectedChatRoom?.id;
    const [items, setItems] = useState([] as MessageInterface[]);

    const [hasMore, setHasMore] = useState(true);

    const [page, setPage] = useState(0);

    useEffect(() => {
        const getComments = async () => {
            if (chatRoomId) {
                getChatRoomMessages(chatRoomId, page)?.then(data => {
                        console.log("fetching data");
                        setItems(data.data);
                        setPage(0)
                    }
                ).catch(err => {
                        console.log(err);
                    }
                );
            }
        };

        getComments();
    }, [chatRoomId]);
    const fetchData = () => {
        console.log("fetching data2");
        if (chatRoomId) {
            getChatRoomMessages(chatRoomId, page)?.then(data => {
                    setItems(items.concat(data.data));
                    setPage(page + 1);
                    console.log("fetching data2");
                    console.log(data);
                    // setHasMore(data.data.length > 0);
                }
            ).catch(err => {
                    console.log(err);

                }
            );
        }

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
                <List sx={{maxHeight: '100%', overflow: 'auto', width: "70vw"}}
                      id="scrollableDiv"
                >

                    <InfiniteScroll
                        dataLength={items.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={true}
                        scrollableTarget={'scrollableDiv'}
                        loader={<h4>Loading...</h4>}
                        endMessage={<p style={{textAlign: "center"}}>
                            <b>Yay! You have seen it all</b>
                        </p>}
                    >
                        {items.map((item,index) => {
                            return <MessageBubble key={index} message={item}/>;
                        })}
                    </InfiniteScroll>
                </List>
            </Box>
        </Paper>
        </Box>
    );

}