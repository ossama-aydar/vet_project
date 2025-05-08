import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddVeterinarianForm from './AddVeterinarianForm';

function VeterinariansList() {
  const [vets, setVets] = useState([]);
  const [error, setError] = useState('');
  const [selectedVet, setSelectedVet] = useState(null);
  const [editVet, setEditVet] = useState(null);
  const [editError, setEditError] = useState('');

  const fetchVets = () => {
    axios.get('http://localhost:5000/veterinarians')
      .then(res => setVets(res.data))
      .catch(() => setError('Error loading veterinarians'));
  };

  useEffect(() => {
    fetchVets();
  }, []);

  const handleAddVet = () => {
    fetchVets();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this veterinarian?')) {
      try {
        await axios.delete(`http://localhost:5000/veterinarians/${id}`);
        fetchVets();
      } catch {
        alert('Error deleting veterinarian');
      }
    }
  };

  const handleEditChange = e => {
    setEditVet({ ...editVet, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    setEditError('');
    try {
      await axios.put(`http://localhost:5000/veterinarians/${editVet._id}`, editVet);
      setEditVet(null);
      fetchVets();
    } catch (err) {
      setEditError(err.response?.data?.error || 'Error updating veterinarian');
    }
  };

  return (
    <div className="row">
      {/* Left Column - Add Form */}
      <div className="col-md-4">
        <AddVeterinarianForm onAdd={handleAddVet} />
      </div>

      {/* Right Column - Veterinarians List */}
      <div className="col-md-8">
        <div className="card p-4" style={{background:'#f4fafd', borderColor:'#b2dfdb'}}>
          <h3 style={{color:'#00796b'}}>Veterinarians List</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {vets.length === 0 ? (
            <p>No veterinarians found.</p>
          ) : (
            <ul className="list-group">
              {vets.map(vet => (
                <li className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center" key={vet._id} style={{background:'#e6f7fa', borderColor:'#b2dfdb'}}>
                  <div>
                    <strong style={{color:'#00796b'}}>{vet.name}</strong> - {vet.specialty}<br />
                    <span>Email: {vet.email} | Phone: {vet.phoneNumber}</span>
                  </div>
                  <div className="mt-2 mt-md-0">
                    <button className="btn btn-sm btn-primary me-2" onClick={() => setSelectedVet(vet)}>View</button>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => setEditVet(vet)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(vet._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* View Modal */}
      {selectedVet && (
        <div className="modal show d-block" tabIndex="-1" style={{background:'rgba(0,0,0,0.3)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Veterinarian Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedVet(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedVet.name}</p>
                <p><strong>Specialty:</strong> {selectedVet.specialty}</p>
                <p><strong>Email:</strong> {selectedVet.email}</p>
                <p><strong>Phone:</strong> {selectedVet.phoneNumber}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedVet(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {editVet && (
        <div className="modal show d-block" tabIndex="-1" style={{background:'rgba(0,0,0,0.3)'}}>
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleEditSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Veterinarian</h5>
                <button type="button" className="btn-close" onClick={() => setEditVet(null)}></button>
              </div>
              <div className="modal-body">
                {editError && <div className="alert alert-danger">{editError}</div>}
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input className="form-control" name="name" value={editVet.name} onChange={handleEditChange} required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Specialty</label>
                  <input className="form-control" name="specialty" value={editVet.specialty} onChange={handleEditChange} required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input className="form-control" name="email" type="email" value={editVet.email} onChange={handleEditChange} required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Phone Number</label>
                  <input className="form-control" name="phoneNumber" value={editVet.phoneNumber} onChange={handleEditChange} required />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" type="submit">Save Changes</button>
                <button className="btn btn-secondary" type="button" onClick={() => setEditVet(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VeterinariansList;
