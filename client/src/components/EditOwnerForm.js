import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditOwnerForm() {
  const { id } = useParams();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/owners/${id}/full`).then(res => {
      setForm({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        address: res.data.address,
        phoneNumber: res.data.phoneNumber,
        email: res.data.email
      });
    }).catch(() => setError('Error loading owner info'));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`http://localhost:5000/owners/${id}`, form);
      navigate(`/owners/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating owner');
    }
  };

  return (
    <form className="card p-4" onSubmit={handleSubmit}>
      <h3>Edit Owner Info</h3>
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
      <button className="btn btn-primary" type="submit">Save Changes</button>
    </form>
  );
}

export default EditOwnerForm; 