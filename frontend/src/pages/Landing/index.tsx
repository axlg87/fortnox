import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/Axios';


export default function Landing(): JSX.Element {

    const [message, setMessage] = useState("If spring backend is running and database is running, then this message should be replaced!");

    useEffect(() => {
        getHelloWorld();
    }, [])

    function getHelloWorld() {
        axios.get('/helloworld')
            .then(({ data }) => {
                setMessage(data.message);
            })
            .catch(() => {
                setMessage('Error fetching data from API');
            });
    }

    return (
        <div className="landing">
            <h3 className="mb-3 text-center">{message}</h3>
            <div className="d-flex justify-content-md-center">

                <Link to="/rent">
                    <button className="btn btn-primary">Rent car</button>
                </Link>
                <Link to="/admin">
                    <button className="btn btn-secondary ms-2">Admin page</button>
                </Link>
            </div>
        </div>
    );
}