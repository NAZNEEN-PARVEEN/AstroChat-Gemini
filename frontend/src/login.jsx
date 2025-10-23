import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Removing Lucide-React imports for consistency with Signup.jsx

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Placeholder for your backend API call
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in both fields.');
      setLoading(false);
      return;
    }

    try {
      // **REPLACE THIS with your actual backend authentication fetch call.**
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Simulate token storage in this environment
        console.log('Login successful. Token placeholder simulated.');
        // Navigate to the main application page
        navigate('/'); 

      } else {
        setError(data.message || 'Login failed. Invalid email or password.');
      }
    } catch (err) {
      setError('Network error. Could not connect to the server.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
        {/* --- PURE CSS STYLES (MATCHING SIGNUP) --- */}
        <style>
            {`
            /* Container: Full screen dark background and centering */
            .login-container {
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
            /* Login Accent: Blue/Indigo for icons */
            .form-header i {
                color: #4a90e2; /* Accent color - Blue */
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
                border-color: #4a90e2; /* Accent color on focus */
                box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
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

            /* Submit Button - Use Indigo/Blue Accent */
            .submit-button {
                width: 100%;
                padding: 12px;
                background-color: #4a90e2; /* Blue Accent */
                color: #fff;
                font-weight: 700;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.2s, box-shadow 0.2s;
                margin-top: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            }
            .submit-button:hover:not(:disabled) {
                background-color: #3b74b9;
                box-shadow: 0 6px 8px rgba(0, 0, 0, 0.5);
            }
            .submit-button:disabled {
                background-color: #6e9fcb;
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
                color: #00ff7f; /* Green accent for the link */
                font-weight: 600;
                cursor: pointer;
                text-decoration: none;
                transition: color 0.2s;
            }
            .footer-link button:hover {
                color: #00e676;
                text-decoration: underline;
            }
            `}
        </style>

      <div className="form-card">
        
        {/* Header/Logo Section */}
        <div className="form-header">
          {/* Using Font Awesome for compatibility */}
          <i className="fa-solid fa-right-to-bracket"></i> 
          <h1>Log In</h1>
        </div>

        <form onSubmit={handleLogin}>
          
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
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer Link to Signup */}
        <p className="footer-link">
          New user?{' '}
          <button 
            onClick={() => navigate('/signup')} 
            disabled={loading}
          >
            Create an account
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;