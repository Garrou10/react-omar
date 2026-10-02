import { useState, useEffect } from 'react';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  // NYTT: State för att hantera och visa felmeddelanden på skärmen
  const [error, setError] = useState(null);
  
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchTasks = async () => {
      setError(null); // Rensar eventuella gamla fel
      try {
        const response = await fetch(`http://localhost:5243/api/tasks?username=${username}`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          setError("Kunde inte hämta uppgifter. Servern returnerade ett fel.");
        }
      } catch (err) {
        console.error("Något gick fel vid hämtning:", err);
        setError("Inget svar från servern. Kontrollera att din backend är igång.");
      }
    };
    
    if (username) {
      fetchTasks();
    }
  }, [username]);

  const handleAddTask = async (e) => {
    e.preventDefault(); 
    if (!newTaskTitle.trim()) return;
    setError(null);

    try {
      const response = await fetch('http://localhost:5243/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          Title: newTaskTitle, 
          IsDone: false,
          Username: username 
        })
      });

      if (response.ok) {
        const createdTask = await response.json();
        setTasks([...tasks, createdTask]); 
        setNewTaskTitle('');
      } else {
        setError("Misslyckades med att skapa uppgiften.");
      }
    } catch (err) {
      console.error("Fel vid skapande av uppgift:", err);
      setError("Nätverksfel: Kunde inte skapa uppgiften.");
    }
  };

  const toggleTaskStatus = async (task) => {
    setError(null);
    const updatedTask = { ...task, isDone: !task.isDone };

    try {
      const response = await fetch(`http://localhost:5243/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask) 
      });

      if (response.ok) {
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
      } else {
        setError("Kunde inte uppdatera uppgiften.");
      }
    } catch (err) {
      console.error("Fel vid uppdatering:", err);
      setError("Nätverksfel vid uppdatering av uppgiften.");
    }
  };

  const handleDeleteTask = async (id) => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:5243/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter(t => t.id !== id));
      } else {
        setError("Kunde inte ta bort uppgiften från servern.");
      }
    } catch (err) {
      console.error("Fel vid borttagning:", err);
      setError("Nätverksfel: Kunde inte ta bort uppgiften.");
    }
  };

  const handleImageUpload = async (taskId, file) => {
    if (!file) return;
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:5243/api/tasks/${taskId}/image`, {
        method: 'POST',
        body: formData 
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(t => (t.id === taskId ? updatedTask : t)));
      } else {
        setError("Misslyckades med att ladda upp bilden.");
      }
    } catch (err) {
      console.error("Fel vid bilduppladdning:", err);
      setError("Nätverksfel: Kunde inte ladda upp bilden.");
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Välkommen till Slutprojektet</h2>
      <p style={{ marginBottom: '30px' }}>Det här är huvudvyn där dina uppgifter kommer att visas.</p>
      
      {/* NYTT: Felmeddelande-box som bara visas om 'error' har ett värde */}
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '15px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          border: '1px solid #ef9a9a'
        }}>
          <strong>Fel: </strong> {error}
        </div>
      )}
      
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Skriv en ny uppgift..."
          style={{ flex: 1, padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <button 
          type="submit" 
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Lägg till
        </button>
      </form>

      <h3>Mina Uppgifter</h3>
      
      {tasks.length === 0 ? (
        <p>Du har inga uppgifter i databasen ännu.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li 
              key={task.id} 
              style={{ 
                padding: '15px', 
                backgroundColor: task.isDone ? '#e8f5e9' : '#f9f9f9', 
                borderBottom: '1px solid #ddd',
                marginBottom: '10px',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ textDecoration: task.isDone ? 'line-through' : 'none', color: task.isDone ? '#666' : '#000' }}>
                  {task.title}
                </strong> 
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => toggleTaskStatus(task)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: task.isDone ? '#9e9e9e' : '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {task.isDone ? "Ångra" : "Markera klar"}
                  </button>
                  
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#f44336', 
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Ta bort
                  </button>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '5px' }}>
                {task.imageUrl && (
                  <img 
                    src={`http://localhost:5243${task.imageUrl}`} 
                    alt="Bifogad bild" 
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px', display: 'block', marginBottom: '10px' }} 
                  />
                )}
                
                <div>
                  <label style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                    {task.imageUrl ? "Byt bild:" : "Lägg till bild:"}
                  </label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(task.id, e.target.files[0])}
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;