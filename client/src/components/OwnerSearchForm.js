import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteOwnerButton from './DeleteOwnerButton';

function OwnerSearchForm() {
  const [lastName, setLastName] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  // Use useEffect to perform search when lastName changes
  useEffect(() => {
    const searchOwners = async () => {
      try {
        if (lastName.trim()) {
          const res = await axios.get(`http://localhost:5000/owners?lastName=${lastName}`);
          setResults(res.data);
        } else {
          setResults([]); // Clear results when search is empty
        }
        setError('');
      } catch (err) {
        setError('Error searching owners');
      }
    };

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      searchOwners();
    }, 300); // Wait 300ms after last keystroke before searching

    // Cleanup timeout on each lastName change
    return () => clearTimeout(timeoutId);
  }, [lastName]); // Run effect when lastName changes

  return (
    <div>
      <div className="card p-4 mb-3">
        <h3>Search Owners by Last Name</h3>
        <div className="mb-3">
          <input 
            className="form-control" 
            value={lastName} 
            onChange={e => setLastName(e.target.value)} 
            placeholder="Start typing last name..."
          />
        </div>
        <Link to="/owners/add" className="btn btn-success">Add New Owner</Link>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {results.length > 0 && (
        <div className="card p-3">
          <h5>Results:</h5>
          <ul className="list-group">
            {results.map(owner => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={owner._id}>
                <Link to={`/owners/${owner._id}`}>{owner.firstName} {owner.lastName}</Link>
                <DeleteOwnerButton ownerId={owner._id} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OwnerSearchForm;