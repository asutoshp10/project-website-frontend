import React, { useRef, useEffect, useState } from 'react';

const VideoProcessor = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef=useRef(null);
  const [outputImage, setOutputImage] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [ison,setIson]=useState(false)

  const sendFrame = async () => {
    const canvas = canvasRef.current;
    try{const context = canvas.getContext('2d');

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');

    const response = await fetch(`${process.env.REACT_APP_API_URL}/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageData }),
    });

    const data = await response.json();
    setOutputImage(data.processed_image);}
    catch(error){
        console.error('upload error', error)
    }
  };

  const start = async() => {
    // navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    // videoRef.current.srcObject = stream;
    // });
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    streamRef.current = stream;
    videoRef.current.srcObject = stream;
    const id = setInterval(sendFrame, 500); // every 500ms
    setIntervalId(id);
    setIson(true)
  };

  const stop = () => {
    setOutputImage(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIson(false);
    }
    clearInterval(intervalId);
    setIntervalId(null);
  };
  const handelclick = () =>{
    if (ison){
        stop();
    }
    else {
        start();
    }
  }

  return (
    <div className='video' style={{ textAlign: 'center' }}>
        <div>
        <h2>Real-time Processing</h2>
        <video ref={videoRef} autoPlay width="320" height="240" />
        <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }} />
        <br />
        <button onClick={handelclick}>{ison ? 'Stop' : 'Start'}</button>
      </div>
      {outputImage && (
        <div>
            <h3>Processed Output</h3>
            <img src={outputImage} alt="Processed Output" width="320" height="240" />
        </div>
      )}
    </div>
  );
};

export default VideoProcessor;

