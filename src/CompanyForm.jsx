import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CompanyForm = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyname: '',
        companyaddress: '',
    });

    const [role, setRole] = useState('');

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    useEffect(() => {
        if (id) {
            fetchCompany(id); // Fetch company data if ID is present
        }
    }, [id]);

    const fetchCompany = async (companyId) => {
        try {
            const response = await axios.get(`http://localhost:8081/companyform/${companyId}`);
            setFormData({
                companyname: response.data.companyname,
                companyaddress: response.data.companyaddress,
            });
        } catch (error) {
            console.error('Error fetching company:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const createdby = role; // Use the passed role
        const status = role === 'admin' ? 'Approved' : 'Unapproved';

        const values = {
            companyname: formData.companyname,
            createdby,
            companyaddress: formData.companyaddress,
            status,
        };

        try {
            if (id) {
                // Update the existing company
                await axios.put(`http://localhost:8081/companyform/${id}`, values);
                alert('Company updated successfully!');
            } else {
                // Create a new company
                await axios.post('http://localhost:8081/companyform', values);
                alert('Company created successfully!');
            }

            if (role === 'admin') {
                navigate('/admindashboard'); // Redirect to Admin Dashboard
            } else {
                navigate('/userdashboard'); // Redirect to User Dashboard
            }

        } catch (error) {
            console.error('Error saving company:', error);
            alert('Error saving company. Please try again.');
        }
    };

    const handleCancel = () => {
        // Redirect based on user role
        if (role === 'admin') {
            navigate('/admindashboard'); // Redirect to Admin Dashboard
        } else {
            navigate('/userdashboard'); // Redirect to User Dashboard
        }
    };

    return (
        <div className="container mt-5">
            <h2 className='text-center'>Company Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="companyname" className="form-label">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="companyname"
                        name="companyname"
                        value={formData.companyname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="companyaddress" className="form-label">Company Address</label>
                    <textarea
                        className="form-control"
                        id="companyaddress"
                        name="companyaddress"
                        value={formData.companyaddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default CompanyForm;
