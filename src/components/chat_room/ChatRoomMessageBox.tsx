import Box from "@mui/material/Box";
import {useInfiniteQuery} from "react-query";
import {getChatRoomMessages} from "../../api/ChatRoom/ChatRoom";
import MessageBubble from "../MessageBubble";
import {Button, CircularProgress, Paper} from "@mui/material";
import {infiniteQueryContext, selectedChatRoomContext} from "../../pages/Chat";
import React, {useContext, useEffect} from "react";
// import {VariableSizeList as List} from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
import {List} from "@mui/material"
import messageInterface from "../../api/Message/MessageInterface";
import {useInView} from 'react-intersection-observer'


export default function ChatRoomMessageBox() {
    let selectedChatRoom = useContext(selectedChatRoomContext).selectedChatRoom;

    const {ref, inView} = useInView()
    const setReFetch = useContext(infiniteQueryContext).setRefetch;
    const {
        data,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
        isLoading,
        hasNextPage,
    } = useInfiniteQuery(
        ["messagesData", selectedChatRoom?.id || -1],
        async ({pageParam = 0}) => {
            const res = await getChatRoomMessages(selectedChatRoom?.id || -1, pageParam);
            return {
                data: res.data,
                hasNextPage: res.data.length > 0,
                hasPreviousPage: pageParam > 0,
                nextPage: pageParam - 1,
                currentPage: pageParam,
                previousPage: pageParam + 1,
            }
        },
        {
            // refetchInterval: 10,

            getPreviousPageParam: (lastPage) => {
                if (lastPage.hasPreviousPage) {
                    return lastPage.nextPage;
                }
            },
            getNextPageParam: (lastPage) => {
                if (lastPage.hasNextPage) {
                    return lastPage.previousPage;
                }
            },


        }
    )


    React.useEffect(() => {
        if (inView) {
            const fetchNextPageAsync = async () => {
                await fetchNextPage()
            }
            fetchNextPageAsync().catch(console.error)
        }
    }, [fetchNextPage, inView])

    useEffect(() => {
        setReFetch({'func': refetch, 'param': selectedChatRoom?.id || -1});
    }, [refetch, selectedChatRoom?.id, setReFetch])


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
                {isLoading &&
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
                <List sx={{maxHeight: '100%', overflowY: 'auto', width: "70vw"}}
                      id="scrollableDiv"
                >
                    {data?.pages.map(page => (
                        <React.Fragment key={page.currentPage}>
                            {page.data.map((item: messageInterface) => (
                                <MessageBubble key={item.id} message={item}/>
                            ))}
                        </React.Fragment>
                    ))}
                    <div>
                        <Button
                            ref={ref}
                            onClick={async () => fetchNextPage()}
                            disabled={!hasNextPage || isFetchingNextPage}
                        >
                            {isFetchingNextPage
                                ? 'Loading more...'
                                : hasNextPage
                                    ? 'Load Newer'
                                    : 'Nothing more to load'}
                        </Button>
                    </div>
                </List>

            </Box>
        </Paper>
        </Box>
    );

}