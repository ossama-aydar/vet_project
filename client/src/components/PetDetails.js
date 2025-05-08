import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function PetDetails() {
  const { id } = useParams(); // pet id
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/animals/${id}`)
      .then(res => setPet(res.data))
      .catch(() => setError('Error loading pet details'));
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!pet) return <div>Loading...</div>;

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{pet.name} ({pet.species})</h3>
        <div>
          <Link to={`/visits/add?id=${pet._id}`} className="btn btn-success me-2">Add Visit</Link>
          <Link to={`/pets/${pet._id}/edit`} className="btn btn-warning">Edit Pet</Link>
        </div>
      </div>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age}</p>
      
      <h4 className="mt-4">Visits</h4>
      {pet.visits && pet.visits.length > 0 ? (
        <ul className="list-group">
          {pet.visits.map(visit => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={visit._id}>
              <span>
                <strong>Date:</strong> {visit.date ? new Date(visit.date).toLocaleDateString() : ''}<br />
                <strong>Reason:</strong> {visit.reason}<br />
                {visit.diagnosis && (<><strong>Diagnosis:</strong> {visit.diagnosis}<br /></>)}
                {visit.treatment && (<><strong>Treatment:</strong> {visit.treatment}</>)}
              </span>
              <span>
                <Link to={`/visits/${visit._id}/edit`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={async () => {
                  if (window.confirm('Are you sure you want to delete this visit?')) {
                    try {
                      await axios.delete(`http://localhost:5000/visits/${visit._id}`);
                      // Refresh pet details after successful deletion
                      const updatedPet = await axios.get(`http://localhost:5000/animals/${id}`);
                      setPet(updatedPet.data);
                    } catch (err) {
                      const errorMessage = err.response?.data?.error || 'Error deleting visit';
                      setError(errorMessage);
                    }
                  }
                }}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No visits found.</p>
      )}
    </div>
  );
}

export default PetDetails;
