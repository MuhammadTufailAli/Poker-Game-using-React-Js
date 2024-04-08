import React, { useEffect, useState } from 'react';

const Spinner = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressTimer = setTimeout(() => {
      setLoadingProgress(100); // Adjust progress as needed
    }, 1000); // Adjust the duration as needed

    // Clean up the timer
    return () => clearTimeout(progressTimer);
  }, []);
  return (
    <div className='loading-container-top-div'>
      <div className='loading-container'>
        <div className='spinner-container'>
          <img
            className='Loader-image-css'
            src={'/assets/logo.png'}
            alt='Loading...'
          />
        </div>
      </div>
      <p className='loading-text'>LOADING...</p>
      <div className='loading-bar-container'>
        <img
          src='/assets/bar.png'
          alt='Loading...'
          className='loading-bar'
          style={{ width: `${loadingProgress}%` }}
        />
      </div>
    </div>
  );
};

export default Spinner;
