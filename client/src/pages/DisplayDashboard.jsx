import React from 'react';
import Dashboard from './Dashboard';
import { useParams } from "react-router-dom";



const Dashboard_Display = () => {
    const email_params = useParams();
    console.log("IN THE DASHBOARD FUNCTION THE  EMAIL IS --- ",email_params.email);
    
    return (
    <div>
        <h1>Dashboard</h1>
        <Dashboard email_from_displaydash={email_params.email}/>
    </div>
    );
};

export default Dashboard_Display;



