import * as React from 'react';
import {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';

import Button from 'app/components/Button';

import {Col, Container, Row} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import AddBookForm from "../../components/AddBookForm";

export function AdminDashboardPage() {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const requestOptionsHeaders = {
        'Authorization': 'Basic ' + btoa(unescape(encodeURIComponent(
            sessionStorage.getItem('username') + ":" + sessionStorage.getItem('password'))))
    };
    const dashboardLink = 'http://localhost:8080/SimpleLibrarySpring/dashboard';
    const [dataJson, setDataJson] = useState([]);
    const addBook = event => {
        console.log("Adding book");
        event.preventDefault();
        const t = event.target.elements.formBookTitle.value;
        const a = event.target.elements.formBookAuthor.value;
        const y = event.target.elements.formBookYear.value;
        const json = {
            "title": t,
            "author": a,
            "year": y
        };
        const requestOptions = {
            method: 'POST',
            headers: requestOptionsHeaders,
            body: JSON.stringify(json),
        };
        requestOptions.headers['Content-Type'] = "application/json;charset=UTF-8";

        fetch(dashboardLink, requestOptions).then(data => {
            switch (data.status) {
                case 500:
                    data.json().then(data => {
                        setErrorMessage(data.message);
                        console.log(errorMessage);
                    })
                    break;
                default:
                    showDashboard();
            }
        });
    };
    const deleteBook = (id) => {
        console.log("Deleting book, id = " + id);
        const requestOptions = {
            method: 'DELETE',
            headers: requestOptionsHeaders,
            body: null,
        };

        fetch(dashboardLink + '/' + id, requestOptions).then(data => {
            console.log(data.status);
            showDashboard();
        });
    };
    const logout = () => {
        sessionStorage.clear();
        console.log("Logging out");
        history.push('/');
    };

    const showDashboard = () => {
        console.log("in show dashboard");
        const requestOptions = {
            method: 'GET',
            headers: requestOptionsHeaders,
            body: null,
        };

        fetch(dashboardLink, requestOptions).then(data => {
            console.log(data.status)
            data.json().then(json => {
                setDataJson(json);
                console.log(json)
            });
        });
    };

    useEffect(() => {
        showDashboard();
        console.log("dataJson = " + dataJson.entries())
        console.log(dataJson)
    }, []);

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
                <meta name="description" content="TEMPLATE"/>
            </Helmet>
            <Container fluid>
                <h1>Dashboard</h1>
                <p>{errorMessage}</p>
                <div className="table-wrap">
                    <table className="table table-borderless table-responsive">
                        <thead>
                        <tr>
                            <th className="text-muted fw-600">id</th>
                            <th className="text-muted fw-600">Title</th>
                            <th className="text-muted fw-600">Author</th>
                            <th className="text-muted fw-600">Year</th>
                            <th className="text-muted fw-600"> </th>
                        </tr>
                        </thead>
                        <tbody id="tblbody">
                        {
                            dataJson.map((item) => (
                                <tr key={item['id']}>
                                    <td>{item['id']}</td>
                                    <td>{item['title']}</td>
                                    <td>{item['author']}</td>
                                    <td>{item['year']}</td>
                                    <td><Button onClick={()=>{deleteBook(item['id'])}} text = "Delete" /></td>
                                    <td/>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <Row className="justify-content-md-center">
                    <Col lg={6}>
                        <AddBookForm onSubmit={addBook}/>
                    </Col>
                </Row>
                <Button onClick={logout} text = "Logout" />
            </Container>
        </>
    );
}
