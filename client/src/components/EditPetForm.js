import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditPetForm() {
  const { id } = useParams(); // pet id
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    age: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/animals/${id}`)
      .then(res => {
        setForm({
          name: res.data.name,
          species: res.data.species,
          breed: res.data.breed,
          age: res.data.age
        });
      })
      .catch(() => setError('Error loading pet info'));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`http://localhost:5000/animals/${id}`, { ...form, age: Number(form.age) });
      navigate(-1); // Go back to previous page
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating pet');
    }
  };

  return (
    <form className="card p-4" onSubmit={handleSubmit}>
      <h3>Edit Pet Info</h3>
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
      <button className="btn btn-primary" type="submit">Save Changes</button>
    </form>
  );
}

export default EditPetForm;
