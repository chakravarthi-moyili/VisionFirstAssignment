import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const UserDashboard = () => {
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole'); // Assuming role is stored in localStorage
        if (storedRole) {
            setRole(storedRole);
            fetchCompanies(storedRole);
        }
    }, []);

    const fetchCompanies = async (createdby) => {
        try {
            const response = await axios.get('http://localhost:8081/companyform', {
                params: { createdby }, // Send createdby as a query parameter
            });

            // Filter the companies based on the createdby parameter
            const filteredCompanies = response.data.filter(company => company.createdby === createdby);
            setCompanies(filteredCompanies);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };
    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h2 className='text-center'>User Dashboard</h2>
            <Button variant="danger" onClick={handleLogout} className="mb-3">Logout</Button>
            <table className="table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company, index) => (
                        <tr key={company.id}>
                            <td>{index + 1}</td>
                            <td>{company.companyname}</td>
                            <td>{company.companyaddress}</td>
                            <td>{company.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/companyform'} className='btn btn-warning vw-50'>Create Company</Link>
        </div>
    );
};

export default UserDashboard;
