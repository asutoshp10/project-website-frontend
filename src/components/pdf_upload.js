import React, { useState } from 'react';
import axios from 'axios';
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function FileUpload() {
  const [file, setFile] = useState(null);
  const [job, setJob] = useState('');
  const [result, setResult] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleJobChange = (e) => {
    setJob(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file');

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('job', job);

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Upload error:', error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <form className="submit" onSubmit={handleSubmit}>
        <input className="s_input" type="file" accept="application/pdf" onChange={handleFileChange} />
        <div className="job_d">
          <p>Which job are you targeting?</p>
          <input type="text" value={job} onChange={handleJobChange} className="job_input" />
        </div>
        <button type="submit">Upload</button>
        {loading && <div className="loading">⏳ Processing... Please wait.</div>}
      </form>

      {showToast && <div className="toast show">✅ File uploaded successfully!</div>}

      {result && (
        <div className="result-card">
            <div className="score-section">
                <div style={{ width: 120, height: 120 }}>
                    <CircularProgressbar
                    value={result.score}
                    text={`${result.score}`}
                    styles={buildStyles({
                        textColor: "#4caf50",
                        pathColor: "#4caf50",
                        trailColor: "#e0e0e0",
                        textSize: '24px',
                    })}
                    />
                </div>
                <p className="score-text">
                    {result.score >= 75 ? "Excellent match!" : result.score >= 50 ? "Decent match!" : "Needs improvement"}
                </p>
            </div>

            <div className="section-grid">
            <div className="skill-section">
                <h4> Matching Skills</h4>
                {result.matchingSkills?.map((skill, idx) => (
                <div className="skill-badge match" key={idx}>{skill}</div>
                ))}
            </div>

            <div className="skill-section">
                <h4> Missing Requirements</h4>
                {result.missingSkills?.map((skill, idx) => (
                <div className="skill-badge missing" key={idx}>{skill}</div>
                ))}
            </div>

            <div className="suggestions-section">
                <h4> Improvement Suggestions</h4>
                {result.suggestions?.map((s, i) => (
                <div className="suggestion-box" key={i}>{s}</div>
                ))}
            </div>
            </div>
        </div>
        )}

    </div>
  );
}

export default FileUpload;
