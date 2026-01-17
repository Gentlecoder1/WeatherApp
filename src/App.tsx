import { useState, useEffect } from 'react';
import Home from './Home';
import PageLoader from './components/PageLoader';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1200); // 1.2s
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Home />
      {showLoader && <PageLoader duration={1200} />}
    </>
  )
}

export default App
