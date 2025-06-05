import React,{ useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown'
import TypingText from './typing_text';

function FileUpload(){
    const [file,setFile] = useState(null);
    const [job,setJob]=useState(null);
    const [result,setResult]=useState(null);
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);


    const handelChange = (e) =>{
        setFile(e.target.files[0]);
    }

    const handelChange2 = (e) =>{
        setJob(e.target.job);
    }

    const handelSubmit = async(e) =>{
        e.preventDefault();
        if (!file) return alert('Please select a PDF file');

        const formData= new FormData();
        formData.append('pdf',file);
        formData.append('job',job);

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
            console.log('Server Response:', response.data);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Upload error:', error);
            alert("Upload failed.");
        }finally {
        setLoading(false);
    }
    };

    return (
        <div className='page'>
        <form className='submit' onSubmit={handelSubmit} >
            <input className='s_input' type="file" accept="application/pdf" onChange={handelChange} />
            <div className="job_d">
                <p>Which job are You targeting?</p>
                <input type="text" onChange={handelChange2} className='job_input'/>
            </div>
            <button type='submit'>Upload</button>
            {loading && (
            <div className="loading"> ⏳ Processing... Please wait.</div>
        )}
        </form>
        {showToast && (
        <div className="toast show">✅ File uploaded successfully!</div>
        )}
        {result && (
            <div className='result'>
            <h3>Result:</h3>
            <p><strong>Score/Analysis:</strong><><Markdown>{result.analysis}</Markdown></></p>
            <p><strong>Email(s):</strong> {result.emails.join(', ')}</p>
            </div>
        )}
        </div>
    )
}
export default FileUpload;