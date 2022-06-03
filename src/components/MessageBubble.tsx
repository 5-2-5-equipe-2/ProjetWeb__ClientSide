import ReactMarkdown from 'react-markdown';
import {Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React, {useContext, useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getUserById} from "../api/User/User";
import "./bubble.css";
import Avatar from "@mui/material/Avatar";
import {loggedInUserContext} from "../App";
import MessageInterface from "../api/Message/MessageInterface";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {dark} from "react-syntax-highlighter/dist/esm/styles/prism";
//
// const BlogImage = (props: any) => {
//     return <img {...props} style={{maxWidth: "30vh", maxHeight: "50vh"}} alt={""}/>
// }


export default function MessageBubble({message}: { message: MessageInterface }) {
    const loggedInUser = useContext(loggedInUserContext)['loggedInUser'];

    const {
        data: userData,
        // isLoading: isLoadingUser
    } = useQuery(["user", message.user_id], () => getUserById(message.user_id), {
        refetchInterval: 5000,
    });
    // const [isLeftSide, setIsLeftSide] = useState(false);

    let isLeftSide = message.user_id === loggedInUser.id;
    useEffect(() => {
        if (userData) {
            // setIsLeftSide(message.user_id === loggedInUser.id);
            // console.log('updated');
        }

    }, [userData, message.user_id, loggedInUser.id]);
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
                                {/*{message.content}*/}
                                <ReactMarkdown
                                    disallowedElements={['img']}
                                    // skipHtml={false}
                                    children={message.content}
                                    components={{
                                        code({node, inline, className, children, ...props}) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            // @ts-ignore
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    children={String(children).replace(/\n$/, '')}
                                                    // @ts-ignore
                                                    style={dark}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                />
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        },
                                        // img({src, alt, ...props}) {
                                        //     return <BlogImage src={src} alt={alt} {...props} />
                                        // },
                                        p: (props: any) => <div {...props} />,
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
