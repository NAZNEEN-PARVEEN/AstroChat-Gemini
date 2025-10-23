import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Removing Lucide-React imports as they rely on external libraries and classes.

function Signup() {
 const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle the form submission and API call
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      // **REPLACE THIS with your actual backend registration fetch call.**
      const response = await fetch('https://astrochat-gemini.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Using console.log instead of alert
        console.log('Registration successful! Redirecting to login.'); 
        navigate('/login'); 

      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Could not connect to the server.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Use the standard Pure CSS class for centering
    <div className="signup-container"> 
        {/* --- PURE CSS STYLES --- */}
        <style>
            {`
            /* Container: Full screen dark background and centering */
            .signup-container {
                min-height: 100vh;
                background-color: #161c25;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
            }

            /* Form Card: Defines the look of the registration box */
            .form-card {
                width: 100%;
                max-width: 400px;
                background-color: #1e2430; /* Slightly lighter than background */
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
                border: 1px solid #333;
                color: #ececec;
            }

            /* Header */
            .form-header {
                text-align: center;
                margin-bottom: 30px;
            }
            .form-header h1 {
                font-size: 28px;
                font-weight: 700;
                color: #ececec;
                letter-spacing: 1px;
            }
            .form-header i {
                color: #00ff7f; /* Accent color */
                font-size: 32px;
                margin-bottom: 10px;
                display: block;
            }
            
            /* Input Group */
            .input-group {
                margin-bottom: 20px;
            }
            .input-group label {
                display: block;
                font-size: 14px;
                font-weight: 500;
                color: #b4b4b4;
                margin-bottom: 8px;
            }

            /* Input Field styling */
            .input-wrapper {
                position: relative;
            }
            .input-wrapper i {
                position: absolute;
                left: 15px;
                top: 50%;
                transform: translateY(-50%);
                width: 16px;
                height: 16px;
                color: #6a737d;
            }
            .input-group input {
                width: 100%;
                padding: 12px 15px 12px 40px; /* Space for the icon */
                background-color: #272c35;
                color: #ececec;
                border: 1px solid #3d4653;
                border-radius: 8px;
                transition: border-color 0.2s, box-shadow 0.2s;
                font-size: 16px;
            }
            .input-group input::placeholder {
                color: #6a737d;
            }
            .input-group input:focus {
                outline: none;
                border-color: #00ff7f; /* Accent color on focus */
                box-shadow: 0 0 0 2px rgba(0, 255, 127, 0.2);
            }

            /* Error Message */
            .error-message {
                padding: 10px;
                font-size: 12px;
                font-weight: 500;
                color: #ff6b6b;
                background-color: #440000;
                border-radius: 6px;
                border: 1px solid #880000;
                margin-top: 15px;
            }

            /* Submit Button */
            .submit-button {
                width: 100%;
                padding: 12px;
                background-color: #00ff7f; /* Green Accent */
                color: #111;
                font-weight: 700;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.2s, box-shadow 0.2s;
                margin-top: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            }
            .submit-button:hover:not(:disabled) {
                background-color: #00e676;
                box-shadow: 0 6px 8px rgba(0, 0, 0, 0.5);
            }
            .submit-button:disabled {
                background-color: #00a047;
                cursor: not-allowed;
                opacity: 0.7;
            }
            .spinner {
                animation: spin 1s linear infinite;
                display: inline-block;
                width: 18px;
                height: 18px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #fff;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            /* Footer Link */
            .footer-link {
                margin-top: 25px;
                text-align: center;
                font-size: 14px;
                color: #b4b4b4;
            }
            .footer-link button {
                background: none;
                border: none;
                color: #4a90e2; /* Blue/Indigo link color */
                font-weight: 600;
                cursor: pointer;
                text-decoration: none;
                transition: color 0.2s;
            }
            .footer-link button:hover {
                color: #71b7ff;
                text-decoration: underline;
            }
            `}
        </style>

      <div className="form-card">
        
        {/* Header/Logo Section */}
        <div className="form-header">
          {/* Using Font Awesome for compatibility */}
          <i className="fa-solid fa-user-plus"></i> 
          <h1>Sign Up</h1>
        </div>

        <form onSubmit={handleSignup}>
          
          {/* Name Input */}
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-user"></i>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>
          </div>
          
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-envelope"></i>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-lock"></i>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {/* Confirm Password Input */}
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-lock"></i>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
          </div>


          {/* Error Message */}
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer Link to Login */}
        <p className="footer-link">
          Already a user?{' '}
          <button 
            onClick={() => navigate('/login')} 
            disabled={loading}
          >
            Log in
          </button>
        </p>

      </div>
    </div>
  );
}

export default Signup;
