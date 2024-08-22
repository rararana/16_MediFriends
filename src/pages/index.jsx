import React from 'react';
import NearestHospital from '../components/NearestHospital';

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="min-h-screen">
        <NearestHospital />
      </div>
    </div>
  );
}