// // src/SentimentForm.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import './Prediction.css'; // Import CSS file for styling

// function Prediction() {
//   const [text, setText] = useState('');
//   const [classification, setClassification] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // Add loading state
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) {
//       setError('Please enter the review.');
//       return;
//     }
//     setError('');
//     setIsLoading(true); // Set loading state to true while awaiting response
//     try {
//       const response = await axios.post('http://localhost:8000/predict', { text });
//       setClassification(response.data.classification);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     setIsLoading(false); // Set loading state back to false after response
//   };

//   return (
//     <div className="prediction-container">
//       <h2 className="prediction-title">Fake Review Analysis</h2>
//       <form onSubmit={handleSubmit} className="prediction-form">
//         {/* <label className="prediction-label">
//           Enter text: */}
//           <textarea value={text} placeholder="Enter the review" onChange={(e) => setText(e.target.value)} className="prediction-textarea" />
//         {/* </label> */}
//         <button type="submit" className="prediction-button" disabled={isLoading}>
//           {isLoading ? 'Predicting...' : 'Predict'}
//         </button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//       {classification && <p className="prediction-classification">Classification: {classification}</p>}
//     </div>
//   );
// }

// export default Prediction;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './Prediction.css'; // Import CSS file for styling
// import { Link } from 'react-router-dom';

// function Prediction() {
//   const [text, setText] = useState('');
//   const [classification, setClassification] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // Add loading state
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) {
//       setError('Please enter the review.');
//       return;
//     }
//     setError('');
//     setIsLoading(true); // Set loading state to true while awaiting response
//     try {
//       const response = await axios.post('http://localhost:8000/predict', { text }); // Send the text in the request body
//       setClassification(response.data.classification);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     setIsLoading(false); // Set loading state back to false after response
//   };

//   return (
//     <div className="prediction-container">
//       <h2 className="prediction-title">Fake Review Analysis</h2>
//       <form onSubmit={handleSubmit} className="prediction-form">
//         <textarea value={text} placeholder="Enter the review" onChange={(e) => setText(e.target.value)} className="prediction-textarea" />
//         <button type="submit" className="prediction-button" disabled={isLoading}>
//           {isLoading ? 'Predicting...' : 'Predict'}
//         </button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//       {classification && <p className="prediction-classification">Classification: {classification}</p>}

//       <div className="button-container">
//         <Link to="/reviews"><button>Existing Reviews</button></Link>
//       </div>
//     </div>
//   );
// }

// export default Prediction;



import React, { useState } from 'react';
import axios from 'axios';
import './Prediction.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

function Prediction() {
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [classification, setClassification] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.trim() || !text.trim()) {
      setError('Please enter both the category and the review.');
      return;
    }
    setError('');
    setIsLoading(true); // Set loading state to true while awaiting response
    try {
      const response = await axios.post('http://localhost:8000/predict', { category, text }); // Send the category and text in the request body
      setClassification(response.data.classification);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false); // Set loading state back to false after response
  };

  return (
    <div className="prediction-container">
      <h2 className="prediction-title">Fake Review Analysis</h2>
      <form onSubmit={handleSubmit} className="prediction-form">
        <input type="text" value={category} placeholder="Enter the category" onChange={(e) => setCategory(e.target.value)} className="prediction-input" />
        <textarea value={text} placeholder="Enter the review" onChange={(e) => setText(e.target.value)} className="prediction-textarea" />
        <button type="submit" className="prediction-button" disabled={isLoading}>
          {isLoading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {classification && <p className="prediction-classification">Classification: {classification}</p>}

      <div className="button-container">
        <Link to="/reviews"><button>Existing Reviews</button></Link>
      </div>
    </div>
  );
}

export default Prediction;
