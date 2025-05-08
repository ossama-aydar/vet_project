import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteOwnerButton({ ownerId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this owner?')) {
      try {
        await axios.delete(`http://localhost:5000/owners/${ownerId}`);
        navigate('/owners/search');
      } catch (err) {
        alert('Error deleting owner');
      }
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete Owner
    </button>
  );
}

export default DeleteOwnerButton; 