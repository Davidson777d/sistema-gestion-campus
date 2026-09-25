import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <div className="login-container">
      {}
      <header className="top-navbar">
        <div className="logo-section">
          {}
          <img src="/unicitLogo.jpg" alt="UNICIT Logo" className="logo-img" />
          <span className="brand-title">Campus Virtual</span>
        </div>
        <div className="lang-selector">
          <span>Español - Internacional (es) ▼</span>
        </div>
      </header>

      {}
      <div className="login-card">
        {}
        <div className="card-image-section">
          <img
            src="/unicitCampus.jpg" 
            alt="UNICIT Campus"
            className="campus-img"
          />
        </div>

        {}
        <div className="card-form-section">
          <h2>Inicio de Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Numero de carnet</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Recordar Usuario
              </label>
            </div>

            <button type="submit" className="login-btn">
              Acceder
            </button>

            <div className="forgot-password">
              <a href="#forgot">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;