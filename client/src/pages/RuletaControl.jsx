import { useState, useEffect } from 'react';
import socket from "../socket/socket";

const RuletaControl = () => {
  const [prizes, setPrizes] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    socket.on('update-prizes', (data) => setPrizes(data));
    return () => socket.off('update-prizes');
  }, []);

  const addPrize = () => {
    if (!newItem.trim()) {
      alert('Escribe un premio');
      return;
    }
    const updated = [...prizes, newItem];
    setPrizes(updated); // Actualizar estado local inmediatamente
    socket.emit('set-prizes', updated);
    setNewItem("");
  };

  const toggleSpin = () => {
    if (isSpinning) {
      // Detener giro
      setIsSpinning(false);
      socket.emit('stop-spin');
    } else {
      // Iniciar giro
      setIsSpinning(true);
      socket.emit('start-continuous-spin');
    }
  };

  const handleMouseDown = (e) => {
    // Prevenir menú contextual del botón derecho
    if (e.button === 2) {
      e.preventDefault();
    }
    
    // Activar con botón izquierdo (0) o derecho (2)
    if (e.button === 0 || e.button === 2) {
      toggleSpin();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Control de Ruleta</h2>
      <input 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)} 
        placeholder="Nuevo premio"
      />
      <button onClick={addPrize}>Agregar</button>
      
      <ul>
        {prizes.map((p, i) => (
          <li key={i}>{p} <button onClick={() => removePrize(i)}>X</button></li>
        ))}
      </ul>
      
      <button 
        onMouseDown={handleMouseDown}
        onContextMenu={(e) => e.preventDefault()} // Prevenir menú contextual
        disabled={prizes.length === 0}
        style={{ 
          background: prizes.length === 0 ? '#ccc' : (isSpinning ? '#ff4444' : 'green'), 
          color: 'white', 
          padding: '10px 20px',
          cursor: prizes.length === 0 ? 'not-allowed' : 'pointer'
        }}
        title={isSpinning ? "Click para detener" : "Click izquierdo o derecho para girar"}
      >
        {prizes.length === 0 ? 'Agregar premios primero' : 
         isSpinning ? 'DETENER RULETA' : '¡GIRAR RULETA! (L/R)'}
      </button>
    </div>
  );
};

export default RuletaControl;