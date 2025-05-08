import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddOwnerForm from './components/AddOwnerForm';
import AddPetForm from './components/AddPetForm';
import AddVisitForm from './components/AddVisitForm';
import OwnerSearchForm from './components/OwnerSearchForm';
import EditOwnerForm from './components/EditOwnerForm';
import OwnerDetails from './components/OwnerDetails';
import OwnersList from './components/OwnersList';
import PetDetails from './components/PetDetails';
import EditPetForm from './components/EditPetForm';
import WelcomePage from './components/WelcomePage';
import VeterinariansList from './components/VeterinariansList';
import EditVisitForm from './components/EditVisitForm';

function OwnerSearch() { return <OwnerSearchForm />; }
function AddOwner() { return <AddOwnerForm />; }
function OwnerAddedResult() { return <h2>Owner Added Result</h2>; }
function EditOwner() { return <EditOwnerForm />; }
function AddPet() { return <AddPetForm />; }
function OwnerDetailsPage() { return <OwnerDetails />; }
function EditPet() { return <h2>Edit Pet Info</h2>; }
function AddVisit() { return <AddVisitForm />; }
function AfterVisitAdded() { return <h2>After Visit Added</h2>; }

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">VetCare 360</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/veterinarians">Veterinarians</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/owners/list">All Owners</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/owners/search">Owner Search</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/owners/add">Add Owner</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/veterinarians" element={<VeterinariansList />} />
          <Route path="/owners/search" element={<OwnerSearch />} />
          <Route path="/owners/add" element={<AddOwner />} />
          <Route path="/owners/added" element={<OwnerAddedResult />} />
          <Route path="/owners/:id/edit" element={<EditOwner />} />
          <Route path="/owners/:id/pets/add" element={<AddPet />} />
          <Route path="/owners/list" element={<OwnersList />} />
          <Route path="/owners/:id" element={<OwnerDetailsPage />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/pets/:id/edit" element={<EditPetForm />} />
          <Route path="/visits/add" element={<AddVisit />} />
          <Route path="/visits/added" element={<AfterVisitAdded />} />
          <Route path="/visits/:id/edit" element={<EditVisitForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
