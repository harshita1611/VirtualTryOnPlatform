import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ClothCard from './components/ClothCard';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'


function App() {
  return (
    <div>
      
      <SignedOut>
        <Navbar />
        <ClothCard />
      </SignedOut>
      <SignedIn>
        <Navbar />
        <ClothCard />
      </SignedIn>
    </div>
  );
}

export default App;
