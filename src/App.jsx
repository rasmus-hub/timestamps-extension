import './App.css'
import React from 'react';
import Comments from './Comment';

const App = ({ videoId }) => {
  return (
    <div>
      <Comments videoId={videoId} />
    </div>
  );
};

export default App;
