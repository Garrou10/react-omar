import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  useLocation(); 

  const user = localStorage.getItem('username');
  const isLoggedIn = user !== null;

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav style={{ 
      backgroundColor: '#333', 
      padding: '15px 20px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      color: 'white' 
    }}>
      <h2 style={{ margin: 0 }}>Mitt Slutprojekt</h2>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Hem</Link>
        
        {isLoggedIn ? (
          <>
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Min sida</Link>
            <button 
              onClick={handleLogout}
              style={{
                backgroundColor: '#f44336', color: 'white', border: 'none', 
                padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px'
              }}
            >
              Logga ut
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#ccc', textDecoration: 'none', fontSize: '18px' }}>Logga in</Link>
            {/* NY LÄNK: Skapa konto (visas bara när man är utloggad) */}
            <Link to="/register" style={{ color: '#4CAF50', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>Skapa konto</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;