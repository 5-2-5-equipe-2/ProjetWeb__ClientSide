import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import '../media/css/Login.css';
import {useMutation} from "react-query";
import {login} from "../api/user/user";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { mutate,  } = useMutation(login, {
        onSuccess: data => {
            data = data.data;
            console.log(data);
        },
        onError: (e ) => {
            console.log(e);
        }
    });
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function useHandleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        mutate({username, password});

    }

    return (
        <Container fluid className={'Login'}>
            <Form className={'Login-form'} onSubmit={useHandleSubmit} action={'/'}>
                <Form.Group className={'lg'} controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button className={'mt-4'} type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </Container>
    );
}