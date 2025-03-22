import React from 'react';
import IndiaMap from './components/IndiaMap';
import './components/IndiaMap.css';

const App: React.FC = () => {
  return (
    <div>
      {/* Update the title here */}
      <h1 style={{ textAlign: 'center' }}>Indian Regional Total Electron Content (TEC) Map</h1>
      <IndiaMap />
    </div>
  );
};

export default App;
