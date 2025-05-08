import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OwnersList() {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState('');
  const [selectedOwners, setSelectedOwners] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/owners')
      .then(res => setOwners(res.data))
      .catch(() => setError('Error loading owners'));
  }, []);

  const handleCheckboxChange = (ownerId) => {
    setSelectedOwners(prev => {
      if (prev.includes(ownerId)) {
        return prev.filter(id => id !== ownerId);
      } else {
        return [...prev, ownerId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedOwners.length === owners.length) {
      setSelectedOwners([]);
    } else {
      setSelectedOwners(owners.map(owner => owner._id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedOwners.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedOwners.length} selected owners?`)) {
      try {
        await Promise.all(selectedOwners.map(id => 
          axios.delete(`http://localhost:5000/owners/${id}`)
        ));
        // Refresh the owners list
        const res = await axios.get('http://localhost:5000/owners');
        setOwners(res.data);
        setSelectedOwners([]);
      } catch (err) {
        setError('Error deleting owners');
      }
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card p-4" style={{ background: '#f8f9fa', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: '#2c3e50', fontSize: '1.5rem' }}>All Owners</h3>
        {owners.length > 0 && (
          <div>
            <button 
              className="btn btn-sm btn-danger" 
              onClick={handleDeleteSelected}
              disabled={selectedOwners.length === 0}
              style={{ 
                padding: '0.3rem 0.8rem',
                fontSize: '0.875rem',
                opacity: selectedOwners.length === 0 ? 0.6 : 1
              }}
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>
      {owners.length === 0 ? (
        <p>No owners found.</p>
      ) : (
        <>
          <div className="mb-2">
            <label className="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                checked={selectedOwners.length === owners.length}
                onChange={handleSelectAll}
                className="form-check-input"
              />
              <span style={{ fontSize: '0.9rem', color: '#495057' }}>Select All</span>
            </label>
          </div>
          <ul className="list-group" style={{ borderRadius: '8px' }}>
            {owners.map(owner => (
              <li 
                className="list-group-item d-flex align-items-center gap-3" 
                key={owner._id}
                style={{ 
                  background: selectedOwners.includes(owner._id) ? '#e9ecef' : '#fff',
                  border: '1px solid #dee2e6',
                  transition: 'background-color 0.2s'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedOwners.includes(owner._id)}
                  onChange={() => handleCheckboxChange(owner._id)}
                  className="form-check-input"
                />
                <Link 
                  to={`/owners/${owner._id}`}
                  style={{ 
                    color: '#007bff', 
                    textDecoration: 'none',
                    flex: 1
                  }}
                  className="hover-underline"
                >
                  {owner.firstName} {owner.lastName}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default OwnersList;
