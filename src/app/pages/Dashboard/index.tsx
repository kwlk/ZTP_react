import * as React from 'react';
import {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';

import Button from 'app/components/Button';

import {Container} from 'react-bootstrap';
import {useHistory} from "react-router-dom";

export function DashboardPage() {
    const history = useHistory();
    let adminUser = false;
    const requestOptionsHeaders = {
        'Authorization': 'Basic ' + btoa(unescape(encodeURIComponent(
            sessionStorage.getItem('username') + ":" + sessionStorage.getItem('password'))))
    };
    const dashboardLink = 'http://localhost:8080/SimpleLibrarySpring/dashboard';
    const [dataJson, setDataJson] = useState([]);
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
            adminUser = "admin" == sessionStorage.getItem('username');
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
                <div className="table-wrap">
                    <table className="table table-borderless table-responsive">
                        <thead>
                        <tr>
                            <th className="text-muted fw-600">id</th>
                            <th className="text-muted fw-600">Title</th>
                            <th className="text-muted fw-600">Author</th>
                            <th className="text-muted fw-600">Year</th>
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
                                    <td/>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <Button onClick={logout} text = "Logout" />
            </Container>
        </>
    );
}
