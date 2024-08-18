import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import NoComments from './NoComment.jsx';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  chrome.runtime.sendMessage({ action: "getUrl" }, (response) => {
    if (response && response.url) {
      const videoUrl = response.url;
      const re = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|\?v=|\&v=)([^#\&\?]*).*/;
      const id = videoUrl.match(re);

      console.log(id);
      if (id == null) {
        console.log('No timestamps');
        root.render(<NoComments />);
      } else {
        console.log(id[1]);
        root.render(<App videoId={id[1]} />);
      }
    }
  });
});
