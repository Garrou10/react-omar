import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); 
    
    try {
      // Skickar registreringen till din C#-server
      const response = await fetch('http://localhost:5243/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: username, Password: password })
      });

      if (response.ok) {
        setMessage("Konto skapat! Du kan nu klicka på Logga in i menyn.");
        setUsername('');
        setPassword('');
      } else {
        setMessage("Kunde inte skapa konto. Kanske är namnet upptaget?");
      }
    } catch (error) {
      console.error("Fel:", error);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Skapa konto</h2>
      
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Användarnamn:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
            required 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Lösenord:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
            required 
          />
        </div>

        <button type="submit" style={{ padding: '12px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', marginTop: '10px' }}>
          Registrera dig
        </button>
      </form>

      {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default Register;