// Import necessary libraries and hooks
import React from 'react';
import { useParams } from 'react-router-dom';  // Import the useParams hook
import data from '../data.json';  // Importing the data.json file

function FishPage() {
  const { id } = useParams();  // Destructure id from the useParams hook
  const fishId = id;
  const fish = data.fish.find(f => f.id === fishId);

  return (
    <div style={{ backgroundColor: 'turquoise', color: 'black', fontFamily: 'Helvetica' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Adopt a Fish</h1>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>My name is {fish.name}!</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <img src={fish.image} alt={fish.name} style={{ width: '200px' }} /> {/* Updated alt attribute */}
        {/* Chat box will go here */}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="https://www.tasconservation.org.au/support-tct/protect-tasmania" target="_blank" rel="noopener noreferrer">
          Adopt {fish.name}! Donate to the Tasmanian Conservation Trust
        </a>
      </div>
    </div>
  );
}

export default FishPage;
