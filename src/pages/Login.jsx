import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    try {
      const response = await fetch('http://localhost:5243/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          Username: username, 
          Password: password 
        })
      });

      if (response.ok) {
        console.log("Inloggningen lyckades!");
        
        // HÄR SPARAR VI NAMNET I MINNET NÄR INLOGGNINGEN LYCKAS
        localStorage.setItem('username', username);
        
        navigate('/'); 
      } else {
        console.error("Inloggning misslyckades. Servern svarade med status:", response.status);
      }
    } catch (error) {
      console.error("Kunde inte ansluta till C#-servern.", error);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Logga in</h2>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="username" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Användarnamn:</label>
          <input 
            type="text" 
            id="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
            required 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="password" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Lösenord:</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
            required 
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '12px', fontSize: '16px', backgroundColor: '#333', color: 'white', 
            cursor: 'pointer', border: 'none', borderRadius: '4px', marginTop: '10px'
          }}
        >
          Logga in
        </button>
      </form>
    </div>
  );
}

export default Login;