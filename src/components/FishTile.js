import React from 'react';
import { Link } from 'react-router-dom';  // Import the Link component

function FishTile({ fish }) {
  return (
    <div style={{ width: '200px', textAlign: 'center' }}>
      <h4 style={{ fontSize: '12px', fontWeight: 'bold' }}>{fish.name}</h4>
      <img src={fish.image} alt={fish.name} style={{ width: '100%' }} />
      <p>Species: {fish.species}</p>
      <p>Gender: {fish.gender}</p>
      <p>Location: {fish.location}</p>
      <Link to={`/fish/${fish.id}`} style={{ textDecoration: 'none', color: 'black' }}>  {/* Create a Link to the FishPage */}
        Learn More
      </Link>
    </div>
  );
}

export default FishTile;
