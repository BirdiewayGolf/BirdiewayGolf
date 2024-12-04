// StandingsEditor.jsx
import React from 'react';
import './StandingsEditor.css';

const StandingsEditor = () => {
  return (
    <div className="standings-editor">
      <h1>Standings Editor</h1>
      <form>
        <input type="text" placeholder="Team Name" />
        <input type="number" placeholder="Wins" />
        <input type="number" placeholder="Losses" />
        <button type="submit">Save Standings</button>
      </form>
    </div>
  );
};

export default StandingsEditor;
