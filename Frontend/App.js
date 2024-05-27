import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const [lectures, setLectures] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is already authenticated
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setAuthenticated(true);
    };

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        setAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                <h1>Lecture Management System</h1>
                {authenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Redirect to="/login" />
                )}
            </div>
            <Switch>
                <Route path="/login">
                    <Login onLogin={handleLogin} />
                </Route>
                <Route path="/register" component={Register} />
                <Route path="/dashboard">
                    {authenticated ? (
                        <Dashboard lectures={lectures} />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
            </Switch>
        </Router>
    );
}

const Dashboard = ({ lectures }) => (
    <div>
        <h2>Dashboard</h2>
        <ul>
            {lectures.map(lecture => (
                <li key={lecture.id}>{lecture.title}</li>
            ))}
        </ul>
        {/* Add more components and functionality here */}
    </div>
);

export default App;
