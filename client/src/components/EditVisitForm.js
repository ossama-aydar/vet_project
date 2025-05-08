import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditVisitForm() {
  const { id } = useParams(); // visit id
  const [form, setForm] = useState({
    date: '',
    reason: '',
    diagnosis: '',
    treatment: '',
    veterinarian: '',
    animalId: '' // Added animalId to maintain the relationship
  });
  const [error, setError] = useState('');
  const [vets, setVets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load veterinarians
    axios.get('http://localhost:5000/veterinarians')
      .then(res => setVets(res.data))
      .catch(() => setVets([]));

    // Load visit details
    axios.get(`http://localhost:5000/visits/${id}`)
      .then(res => {
        setForm({
          date: res.data.date ? res.data.date.substring(0, 10) : '',
          reason: res.data.reason,
          diagnosis: res.data.diagnosis || '',
          treatment: res.data.treatment || '',
          veterinarian: res.data.veterinarian || '',
          animalId: res.data.animalId // Store the animalId
        });
      })
      .catch(err => {
        const errorMessage = err.response?.data?.error || 'Error loading visit info';
        setError(errorMessage);
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`http://localhost:5000/visits/${id}`, form);
      // Navigate back to the pet details page instead of just going back
      navigate(`/pets/${form.animalId}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating visit');
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <form className="card p-4" onSubmit={handleSubmit}>
      <h3>Edit Visit</h3>
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
      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save Changes</button>
        <button className="btn btn-secondary" type="button" onClick={() => navigate(`/pets/${form.animalId}`)}>Cancel</button>
      </div>
    </form>
  );
}

export default EditVisitForm;
