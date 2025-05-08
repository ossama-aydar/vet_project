import React, { useState } from 'react';
import axios from 'axios';

function AddVeterinarianForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    specialty: '',
    email: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/veterinarians', form);
      setForm({ name: '', specialty: '', email: '', phoneNumber: '' });
      if (onAdd) onAdd(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding veterinarian');
    }
  };

  return (
    <form className="card p-3 mb-4" onSubmit={handleSubmit} style={{background:'#e6f7fa', borderColor:'#b2dfdb'}}>
      <h4>Add New Veterinarian</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-2">
        <label className="form-label">Name</label>
        <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Specialty</label>
        <input className="form-control" name="specialty" value={form.specialty} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Email</label>
        <input className="form-control" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Phone Number</label>
        <input className="form-control" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
      </div>
      <button className="btn btn-success mt-2" type="submit">Add Veterinarian</button>
    </form>
  );
}

export default AddVeterinarianForm;
