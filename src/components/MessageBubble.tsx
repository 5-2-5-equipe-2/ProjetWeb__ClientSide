import ReactMarkdown from 'react-markdown';
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getMessage, nullMessage} from "../api/Message/Message";

export default function MessageBubble({messageId}: { messageId: Number }) {
    const [message, setMessage] = useState(nullMessage);
    // render message bubble message content using markdown
    const {data, isLoading} = useQuery(["message", messageId], () => getMessage(messageId), {
        refetchInterval: 1000,
    });
    console.log(data);
    useEffect(() => {
        if (data && data.data) {
            setMessage(data.data);
        }
    }, [data])
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {isLoading &&
                <CircularProgress/>
            }
            {message &&
                <ReactMarkdown children={message.content}/>
                // message.content
            }
        </Box>
    );
}
