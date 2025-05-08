import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function OwnerDetails() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/owners/${id}/full`).then(res => {
      setOwner(res.data);
    }).catch(() => setError('Error loading owner details'));
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!owner) return <div>Loading...</div>;

  return (
    <div className="card p-4">
      <h3>{owner.firstName} {owner.lastName}</h3>
      <p><strong>Address:</strong> {owner.address}</p>
      <p><strong>Phone:</strong> {owner.phoneNumber}</p>
      <p><strong>Email:</strong> {owner.email}</p>
      <Link to={`/owners/${id}/edit`} className="btn btn-warning me-2">Edit Owner</Link>
      <Link to={`/owners/${id}/pets/add`} className="btn btn-success">Add Pet</Link>
      <h4 className="mt-4">Pets</h4>
      {owner.pets && owner.pets.length > 0 ? (
        <ul className="list-group">
          {owner.pets.map(pet => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={pet._id}>
              <span>
                {pet.name} ({pet.species}, {pet.breed}, Age: {pet.age})
              </span>
              <span>
                <Link to={`/pets/${pet._id}`} className="btn btn-sm btn-primary me-2">View Details</Link>
                <Link to={`/pets/${pet._id}/edit`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <Link to={`/visits/add?id=${pet._id}`} className="btn btn-sm btn-info me-2">Add Visit</Link>
                <button className="btn btn-sm btn-danger" onClick={async () => {
                  if (window.confirm('Are you sure you want to delete this pet?')) {
                    try {
                      await axios.delete(`http://localhost:5000/animals/${pet._id}`);
                      // Refresh owner details after deletion
                      const res = await axios.get(`http://localhost:5000/owners/${id}/full`);
                      setOwner(res.data);
                    } catch (err) {
                      alert('Error deleting pet');
                    }
                  }
                }}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pets found.</p>
      )}
    </div>
  );
}

export default OwnerDetails;