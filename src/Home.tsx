import { useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';

function Home() {
  // Shared unit state
  const [selectedUnits, setSelectedUnits] = useState<Record<number, number>>({ 0: 1, 1: 1, 2: 1 }); // default to first unit for each category

  return (
    <div className="w-full flex flex-col items-center">
      <Header selectedUnits={selectedUnits} setSelectedUnits={setSelectedUnits} />
      <Body selectedUnits={selectedUnits} />
    </div>
  );
}

export default Home
