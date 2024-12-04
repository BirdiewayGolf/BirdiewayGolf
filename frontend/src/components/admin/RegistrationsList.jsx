import React from 'react';
import './RegistrationsList.css';

const RegistrationsList = () => {
  return (
    <div className="registrations-list">
      <h1>Registrations List</h1>
      <div className="registrations-container">
        <ul>
          <li>
            <span>John Doe</span> - Registered for "Spring Tournament"
          </li>
          <li>
            <span>Jane Smith</span> - Registered for "Winter Classic"
          </li>
          <li>
            <span>Mike Brown</span> - Registered for "Summer Open"
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegistrationsList;
