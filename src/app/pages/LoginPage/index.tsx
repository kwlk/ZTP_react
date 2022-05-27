/**
 *
 * LoginPage
 *
 */

import React, {useState} from 'react';

import LoginForm from 'app/components/LoginForm';

import {useHistory} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';

export const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const goLogin = event => {
        event.preventDefault();
        const username = event.target.elements.formBasicEmail.value;
        const password = event.target.elements.formBasicPassword.value;

        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': 'Basic ' + btoa(unescape(encodeURIComponent(username + ":" + password)))},
            body: null,
        };

        fetch('http://localhost:8080/SimpleLibrarySpring/dashboard', requestOptions).then(data => {
            setErrorMessage("");
            switch (data.status) {
                case 200:
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('password', password);
                    "admin" == username ? history.push('/dashboardAdmin') : history.push('/dashboard');
                    break;
                case 401:
                    console.log("User unauthorised, do something about it");
                    setErrorMessage("Your login information was incorrect. Please try again.");
                    break;
                default:
                    console.log("New error?");
                    console.log(data.status);
            }
        });
    };

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col lg={6}>
                    <LoginForm onSubmit={goLogin}/>
                </Col>
            </Row>
            <p>{errorMessage}</p>
        </Container>
    );
};
