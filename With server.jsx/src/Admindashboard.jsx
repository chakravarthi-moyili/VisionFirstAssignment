import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap'; // Ensure this line is correct

const AdminDashboard = () => {
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:8081/companyform'); // Use the correct endpoint
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleEdit = (companyId) => {
        navigate(`/companyform/${companyId}`);
    };

    const handleDelete = async (companyId) => {
        try {
            await axios.delete(`http://localhost:8081/companyform/${companyId}`); // Use the correct endpoint
            fetchCompanies(); // Refresh the list after deletion
            alert('Company deleted successfully!');
        } catch (error) {
            console.error('Error deleting company:', error);
            alert('Error deleting company. Please try again.');
        }
    };

    const handleApprove = async (companyId) => {
        try {
            await axios.patch(`http://localhost:8081/companyform/${companyId}/approve`); // Use the correct endpoint
            fetchCompanies(); // Refresh the list after approving
            alert('Company approved successfully!');
        } catch (error) {
            console.error('Error approving company:', error);
            alert('Error approving company. Please try again.');
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h2 className='text-center'>Admin Dashboard</h2>
            <Button variant="danger" onClick={handleLogout} className="mb-3">Logout</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Company Name</th>
                        <th style={{ display: 'none' }}>ID</th>
                        <th>Created By</th>
                        <th>Company Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company, index) => (
                        <tr key={company.id}>
                            <td>{index + 1}</td>
                            <td style={{ display: 'none' }}>{company.id}</td>
                            <td>{company.companyname}</td>
                            <td>{company.createdby}</td>
                            <td>{company.companyaddress}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(company.id)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(company.id)}>Delete</Button>
                                {company.status === 'Unapproved' && (
                                    <Button variant="success" onClick={() => handleApprove(company.id)}>Approve</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Link to={'/companyform'} className='btn btn-warning vw-50'>Create Company</Link>
        </div>
    );
};

export default AdminDashboard;
