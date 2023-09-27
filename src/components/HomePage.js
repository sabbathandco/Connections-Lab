import React from 'react';
import data from '../data.json';
import FishTile from './FishTile';

function HomePage() {
  return (
<div style={{ backgroundColor: 'turquoise', color: 'black', fontFamily: 'Helvetica' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Adopt a Fish</h1>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ready to Adopt a Fish?</h2>
      <h3 style={{ fontSize: '18px' }}>Meet local fish</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {data.fish.map(fish => (
          <FishTile key={fish.id} fish={fish} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
