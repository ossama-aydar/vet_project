import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function AddVisitForm() {
  const [form, setForm] = useState({
    date: '',
    reason: '',
    diagnosis: '',
    treatment: '',
    veterinarian: ''
  });
  const [error, setError] = useState('');
  const [vets, setVets] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const animalId = searchParams.get('id');

  useEffect(() => {
    axios.get('http://localhost:5000/veterinarians')
      .then(res => setVets(res.data))
      .catch(() => setVets([]));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/visits', { ...form, animalId });
      navigate(`/pets/${animalId}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding visit');
    }
  };

  return (
    <form className="card p-4" onSubmit={handleSubmit}>
      <h3>Add New Visit</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input className="form-control" name="date" type="date" value={form.date} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Reason</label>
        <input className="form-control" name="reason" value={form.reason} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Diagnosis</label>
        <input className="form-control" name="diagnosis" value={form.diagnosis} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Treatment</label>
        <input className="form-control" name="treatment" value={form.treatment} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Veterinarian</label>
        <select className="form-control" name="veterinarian" value={form.veterinarian} onChange={handleChange} required>
          <option value="">Select a veterinarian</option>
          {vets.map(vet => (
            <option key={vet._id} value={vet._id}>{vet.name} ({vet.specialty})</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" type="submit">Add Visit</button>
    </form>
  );
}

export default AddVisitForm;