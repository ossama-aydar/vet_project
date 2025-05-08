import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddPetForm() {
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id: ownerId } = useParams();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/animals', { ...form, age: Number(form.age), ownerId });
      navigate(`/owners/${ownerId}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding pet');
    }
  };

  return (
    <form className="card p-4" onSubmit={handleSubmit}>
      <h3>Add New Pet</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Species</label>
        <input className="form-control" name="species" value={form.species} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Breed</label>
        <input className="form-control" name="breed" value={form.breed} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Age</label>
        <input className="form-control" name="age" type="number" value={form.age} onChange={handleChange} required />
      </div>
      <button className="btn btn-primary" type="submit">Add Pet</button>
    </form>
  );
}

export default AddPetForm; 