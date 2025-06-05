import './App.css';
import React,{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import FileUpload from './components/pdf_upload'
import Navbar from './components/navbar'
import CameraFeed from './components/camera';
import TypingText from './components/typing_text';
function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = (mode) => {
    setTheme(mode); 
  };
  return (
    <div className={`app ${theme}`}>
      <header className="App-header">
        <Navbar onToggleTheme={toggleTheme} />
      </header>
      <section>
        <div className="home_" id='home'>
        <div className="home-container">
          <h1>Welcome to My Project Showcase</h1>
          <p className="intro">
            I'm Asutosh Pradhan, a passionate developer exploring real-world AI and web technologies.
            This site is a curated collection of my hands-on projects, each aimed at solving real problems
            using tools like Machine Learning, Deep Learning, and Computer Vision.
          </p>

          <p className="highlight">
            🚀 Currently Featured Projects:
            <ul>
              <li><strong>Resume Scorer</strong>: Uses Google Gemini to evaluate your resume and provide actionable improvement tips using LLM-powered analysis.</li>
              <li><strong>Hand Posture Detection</strong>: Real-time hand landmark detection using MediaPipe, perfect for gesture-based interfaces and accessibility solutions.</li>
              <li>...and many more including computer vision, time series modeling, and smart UI components.</li>
            </ul>
          </p>
        </div>
        <div className="github-projects">
          <h2>🔗 Explore My Projects on GitHub</h2>
          <div className="project-cards">
            <a href="https://github.com/asutoshp10" className="card" target="_blank">
              <h3>Resume Scorer</h3>
              <p>Gemini-powered LLM app that scores resumes and suggests improvements.</p>
            </a>

            <a href="https://github.com/asutoshp10/gesture-controlled-volume" className="card" target="_blank">
              <h3>Hand Posture Detection</h3>
              <p>MediaPipe-based real-time hand landmark visualizer using your webcam.</p>
            </a>

            <a href="https://github.com/asutoshp10/GAN" className="card" target="_blank">
              <h3>GAN</h3>
              <p>GAN architecture from scratch.</p>
            </a>

            <a href="https://github.com/asutoshp10" className="card" target="_blank">
              <h3>YOLO</h3>
              <p>Trained Ultralytics YOLOv8 for real time object detection.</p>
            </a>

            {/* Add more project cards as needed */}
          </div>
        </div>

      </div>
      <div className="resume_scorer_" id='resume_scorer'>
        <h1>🎯 Resume Score Calculator</h1>
        <FileUpload/>
        <TypingText text="Analyse your resume" />
      </div>
      <div className="cnn_" id="cnn">
        <h1>CNN Projects</h1>
        <CameraFeed/>
        <TypingText text="Click Start and show your hands" />
      </div>
      </section>
    </div>
  );
}

export default App;
