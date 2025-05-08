import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function VisitDetails() {
  const { id } = useParams(); // visit id
  const [visit, setVisit] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/visits/${id}`)
      .then(res => setVisit(res.data))
      .catch(() => setError('Error loading visit details'));
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!visit) return <div>Loading...</div>;

  return (
    <div className="card p-4">
      <h3>Visit Details</h3>
      <p><strong>Date:</strong> {visit.date ? new Date(visit.date).toLocaleDateString() : ''}</p>
      <p><strong>Reason:</strong> {visit.reason}</p>
      {visit.diagnosis && <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>}
      {visit.treatment && <p><strong>Treatment:</strong> {visit.treatment}</p>}
      <Link to={`/visits/${visit._id}/edit`} className="btn btn-warning me-2">Edit Visit</Link>
    </div>
  );
}

export default VisitDetails;
