import React from 'react';
import NearestHospital from '../components/NearestHospital';
import HospitalList from '@/components/HospitalList';

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="min-h-screen">
        <NearestHospital />
        <HospitalList />
      </div>
    </div>
  );
}