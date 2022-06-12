import {Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React, {useContext} from "react";
import {useQuery} from "react-query";
import {getUserById} from "../../api/User/User";
import "./bubble.css";
import Avatar from "@mui/material/Avatar";
import {loggedInUserContext} from "../../App";
import MessageInterface from "../../api/Message/MessageInterface";
import UserInterface from "../../api/User/UserInterface";
// import showdown from "showdown";
import ReactMarkdown from "react-markdown";
import remarkImages from "remark-images";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import SyntaxHighlighter from "react-syntax-highlighter";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeKatex from "rehype-katex";
import {dark} from "react-syntax-highlighter/dist/esm/styles/hljs";

const BlogImage = (props: any) => {
    return <img {...props} style={{maxWidth: "10vw", maxHeight: "10vh"}} alt={""}/>
}


const getUserInitials = (user?: UserInterface) => {
    if (user) {
        if (user.first_name && user.surname) {
            return user.first_name.charAt(0) + user.surname.charAt(0);
        }
        if (user.username) {
            return user.username.charAt(0);
        }
    }
    return "";
}

export default function MessageBubble({message}: { message: MessageInterface }) {
    const loggedInUser = useContext(loggedInUserContext)['loggedInUser'];
    const {
        data: userData,
        // isLoading: isLoadingUser
    } = useQuery(["user", message.user_id], async () => {
        let data = await getUserById(message.user_id);
        return data?.data[0];
    }, {
        refetchInterval: 10000,

    });
    const isLeftSide = message.user_id === loggedInUser.id;

    // useEffect(() => {
    //     return () => {
    //         const htmlInput = '<div><h1>Title</h1><p>A paragraph</p></div>';
    //     };
    // }, [message.content]);
    // console.log(userData);

    return (

        <Grid container
              direction={isLeftSide ? 'row' : 'row-reverse'}
              justifyContent="center"
              alignItems={'center'}
              spacing={0}
              style={{
                  width: "80%",
                  height: "100%",
              }}

        >
            <Grid item xs={1} sx={!isLeftSide ? {marginLeft: "auto"} : {marginRight: "auto"}}>
                <Avatar
                    src={userData?.profile_picture}
                    sx={isLeftSide ? {
                        marginLeft: "auto",
                        minHeight: "100%",
                        marginTop: "3%"
                    } : {
                        marginRight: "auto",
                        minHeight: "100%",
                        marginTop: "3%"
                    }}
                >{`${getUserInitials(userData)}`}</Avatar>

            </Grid>


            <Grid item xs={11}>

                <Box className="imessage"
                     style={isLeftSide ? {} : {marginLeft: "auto"}}>
                    <Typography className={isLeftSide ? "from-them" : "from-me"}>
                        {/*{message.content}*/}
                        <ReactMarkdown
                            rehypePlugins={[rehypeKatex, remarkGfm, remarkParse, remarkImages,
                                remarkMath, remarkUnwrapImages, rehypeKatex]}
                            // disallowedElements={['img']}
                            children={message.content}
                            remarkPlugins={[
                                [remarkMath],
                                [remarkImages, {
                                    quality: 10,
                                    withWebp: true,
                                    loading: 'lazy',
                                    backgroundColor: '#fafafa',

                                }],
                                [remarkGfm, {singleTilde: false}],
                                [remarkParse, {commonmark: true}],
                                // [remarkEmbedImages],
                                [remarkUnwrapImages],
                            ]}
                            components={{
                                code({node, inline, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || '')
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
                                img({src, alt, ...props}) {
                                    return <BlogImage src={src} alt={alt} {...props} />
                                },
                                p: (props: any) => <div {...props} />,
                            }}
                        />

                        {/*{message.content}*/}

                    </Typography>
                </Box>
            </Grid>
        </Grid>

    );
}
