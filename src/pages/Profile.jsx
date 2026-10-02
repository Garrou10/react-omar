import { useState, useEffect } from 'react';

function Profile() {
  const [tasks, setTasks] = useState([]);
  
  //  Vi hämtar namnet från webbläsarens minne istället för att hårdkoda det.
  // Om minnet av någon anledning skulle vara tomt visar vi "Användare" som reserv.
  const username = localStorage.getItem('username') || "Användare"; 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5243/api/tasks?username=${username}`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error("Något gick fel vid hämtning av statistik:", error);
      }
    };
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter(task => task.isDone).length;
  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Min Sida</h2>
      <p style={{ fontSize: '18px' }}>Välkommen tillbaka, <strong>{username}</strong>!</p>

      <div style={{ 
        backgroundColor: '#f1f1f1', 
        padding: '25px', 
        borderRadius: '8px', 
        marginTop: '30px',
        borderLeft: '5px solid #2196F3'
      }}>
        <h3 style={{ marginTop: 0 }}>Din uppgifts-statistik 📊</h3>
        <ul style={{ listStyleType: 'none', padding: 0, fontSize: '16px', lineHeight: '1.8' }}>
          <li>Totalt antal uppgifter: <strong>{totalTasks}</strong></li>
          <li>Avklarade uppgifter: <strong style={{ color: '#4CAF50' }}>{completedTasks}</strong></li>
          <li>Kvar att göra: <strong style={{ color: '#f44336' }}>{pendingTasks}</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;