import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddOwnerForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/owners', form);
      navigate('/owners/added');
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Error adding owner');
    }
  };

  return (
    <form className="card p-4" onSubmit={handleSubmit}>
      <h3>Add New Owner</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input className="form-control" name="firstName" value={form.firstName} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input className="form-control" name="lastName" value={form.lastName} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input className="form-control" name="address" value={form.address} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input className="form-control" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input className="form-control" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <button className="btn btn-primary" type="submit">Add Owner</button>
    </form>
  );
}

export default AddOwnerForm;