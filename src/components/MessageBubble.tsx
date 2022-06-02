import ReactMarkdown from 'react-markdown';
import {Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext} from "react";
import {useQuery} from "react-query";
import {getUserById} from "../api/User/User";
import "./bubble.css";
import Avatar from "@mui/material/Avatar";
import {loggedInUserContext} from "../App";
import MessageInterface from "../api/Message/MessageInterface";
//
// const BlogImage = (props: any) => {
//     return <img {...props} style={{maxWidth: "30vh", maxHeight: "50vh"}} alt={""}/>
// }


export default function MessageBubble({message}: { message: MessageInterface }) {
    const loggedInUser = useContext(loggedInUserContext)['loggedInUser'];

    let messageUserId = message.user_id as number;
    const {
        data: userData,
        // isLoading: isLoadingUser
    } = useQuery(["user", messageUserId], () => getUserById(messageUserId), {
        refetchInterval: 5000,
    });
    let isLeftSide = false;
    if (userData) {
        isLeftSide = message.user_id === loggedInUser.id;
        // console.log(isLeftSide);

    }
    // console.log(messageData?.data?.user_id);
    // console.log(userId);

    // console.log(messageData);
    // console.log(userData);
    // useEffect(() => {
    //     if (messageData && messageData.data) {
    //         setMessage(messageData.data);
    //     }
    //
    // }, [messageData])
    return (
        <>

            <Grid container
                  direction={isLeftSide ? 'row' : 'row-reverse'}
                  justifyContent="center"
                  alignItems={'flex-start'}
                  spacing={0}
                  style={{
                      width: "100%",
                      height: "100%",
                  }}

            >
                <Grid item xs={1} sx={!isLeftSide ? {marginLeft: "auto"} : {marginRight: "auto"}}>
                    <Avatar src={userData?.data.profile_picture} sx={isLeftSide ? {
                        marginLeft: "auto",
                        minHeight: "100%",
                        marginTop: "3%"
                    } : {
                        marginRight: "auto",
                        minHeight: "100%",
                        marginTop: "3%"
                    }}

                    />
                </Grid>


                <Grid item xs={11}>

                    <>
                        <div className="imessage"
                             style={isLeftSide ? {width: "90%"} : {width: "90%", marginLeft: "auto"}}>
                            <Typography className={isLeftSide ? "from-them" : "from-me"}>
                                <ReactMarkdown
                                    disallowedElements={['img']}
                                    skipHtml={false}
                                    children={message.content}
                                    components={{
                                        // code({node, inline, className, children, ...props}) {
                                        //     const match = /language-(\w+)/.exec(className || '')
                                        //     return !inline && match ? (
                                        //         <SyntaxHighlighter
                                        //             children={String(children).replace(/\n$/, '')}
                                        //             style={dark}
                                        //             language={match[1]}
                                        //             PreTag="div"
                                        //             {...props}
                                        //         />
                                        //     ) : (
                                        //         <code className={className} {...props}>
                                        //             {children}
                                        //         </code>
                                        //     )
                                        // },
                                        // img({src, alt, ...props}) {
                                        //     return <BlogImage src={src} alt={alt} {...props} />
                                        // },
                                        p: (props: any) => <Box {...props} />,
                                    }}
                                />
                            </Typography>
                        </div>
                    </>

                </Grid>
            </Grid>

        </>
    );
}
