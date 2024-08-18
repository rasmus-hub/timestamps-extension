import React, { useEffect, useState } from 'react';
import './Comment.css';
import { getComments } from './YoutubeService';

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsData = await getComments(videoId);
      const filteredComments = commentsData.filter(comment =>
        /\b\d{1,2}:\d{2}\b/.test(comment.snippet.topLevelComment.snippet.textDisplay)
      );
      setComments(filteredComments);
    };
    fetchComments();
  }, [videoId]);

  const extractTimestamps = (text) => {
    const regex = /\b\d{1,2}:\d{2}\b/g;
    return text.match(regex);
  };

  const handleTimestampClick = (timestamp) => {
    const [minutes, seconds] = timestamp.split(':').map(Number);
    const timeInSeconds = minutes * 60 + seconds;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (timeInSeconds) => {
          const videoElement = document.querySelector('video');
          if (videoElement) {
            videoElement.currentTime = timeInSeconds;
            videoElement.play();
          }
        },
        args: [timeInSeconds]
      });
    });
  };

  if (comments.length == 0) {
    return (
      <article className='yt-extension'>
      <section>
        <header className='yt-extension-header'>
          <h2>Click a Timestamp</h2>
          <p className='yt-extension-header-info'>
            Obtain comments that have <strong>timestamps</strong> by the actual video 📌
          </p>
        </header>
      </section>

      <div className='yt-extension-info'>
        <p><i>There are no comments with timestamps loaded 💤</i></p>
      </div>
    </article>
    )
  } else {
    return (
      <article className='yt-extension'>
        <section>
          <header className='yt-extension-header'>
            <h2>Click a Timestamp</h2>
            <p className='yt-extension-header-info'>
              Obtain comments that have <strong>timestamps</strong> by the actual video 📌
            </p>
          </header>
        </section>

        <div className='yt-extension-info'>
          {
          comments.map(comment => {
            const textDisplay = comment.snippet.topLevelComment.snippet.textDisplay;
            const timestamps = extractTimestamps(textDisplay);
            
            return (
              <div key={comment.id} className='comment'>
                <strong>{comment.snippet.topLevelComment.snippet.authorDisplayName}</strong>
                {timestamps && (
                  <div className='timestamps'>
                    {timestamps.map((timestamp, index) => (
                      <button key={index} onClick={() => handleTimestampClick(timestamp)}>
                        {timestamp}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </article>
    );
  }
};

export default Comments;
