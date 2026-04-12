import React, { useState, useEffect } from 'react';
import socket from "../socket/socket";
import max  from "../../public/maximize.svg";
import min  from "../../public/minimize.svg";

const Ruleta = () => {
  const [prizes, setPrizes] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const rotationRef = React.useRef(0);
  const spinIntervalRef = React.useRef(null);

  useEffect(() => {
    // Obtener los premios al conectar
    socket.emit('get-prizes');

    socket.on('update-prizes', (data) => {
      console.log("Premios actualizados:", data);
      setPrizes(data);
    });

    socket.on('start-spin', (data) => {
      console.log("Evento start-spin recibido:", data);
      const { index, prizesCount } = data;
      
      // Detener giro continuo si está activo
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
        spinIntervalRef.current = null;
      }
      setIsSpinning(false);
      
      const degreesPerSegment = 360 / prizesCount;
      
      // Añadimos 5400 grados (15 vueltas) para que el giro sea mucho más largo
      // La fórmula apunta al CENTRO del segmento para precisión perfecta
      const totalRotation = rotationRef.current + 5400 - ((index * degreesPerSegment) + (degreesPerSegment / 2));
      
      // Usar setTimeout para resetear y luego aplicar la rotación
      setRotation(totalRotation);
      rotationRef.current = totalRotation;
    });

    socket.on('start-continuous-spin', () => {
      console.log("Iniciando giro continuo");
      setIsSpinning(true);
      
      // Iniciar animación continua más rápida
      spinIntervalRef.current = setInterval(() => {
        setRotation(prev => {
          const newRotation = prev + 15; // Girar 15 grados cada intervalo (más rápido)
          rotationRef.current = newRotation;
          return newRotation;
        });
      }, 30); // Actualizar cada 30ms (más frecuente)
    });

    socket.on('stop-spin', () => {
      console.log("Deteniendo giro - girando un poco más");
      
      // Girar un poco más antes de detenerse (aprox 2-3 segundos)
      const extraSpins = 20; // Número de intervalos extra
      let spinCount = 0;
      
      const extraSpinInterval = setInterval(() => {
        setRotation(prev => {
          const newRotation = prev + 15;
          rotationRef.current = newRotation;
          return newRotation;
        });
        
        spinCount++;
        if (spinCount >= extraSpins) {
          clearInterval(extraSpinInterval);
          
          // Ahora detener completamente y calcular premio
          if (spinIntervalRef.current) {
            clearInterval(spinIntervalRef.current);
            spinIntervalRef.current = null;
          }
          setIsSpinning(false);
          
          // Calcular qué premio ganó basado en la posición actual
          const currentRotation = rotationRef.current % 360;
          const degreesPerSegment = 360 / prizes.length;
          const winningIndex = Math.floor((360 - currentRotation) / degreesPerSegment) % prizes.length;
          
          console.log("Premio ganado por posición:", winningIndex, prizes[winningIndex]);
          
          // Enviar resultado al servidor para sincronización
          socket.emit('manual-spin-result', { index: winningIndex, prize: prizes[winningIndex] });
        }
      }, 30);
    });

    socket.on('manual-spin-result', (data) => {
      console.log("Resultado manual recibido:", data);
      // No hacer animación, solo asegurar que la posición esté correcta
      // La ruleta ya está detenida en la posición correcta
    });

    return () => {
      socket.off('update-prizes');
      socket.off('start-spin');
      socket.off('start-continuous-spin');
      socket.off('stop-spin');
      socket.off('manual-spin-result');
      socket.off('spin-error');
      // Limpiar intervalo si existe
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
    };
  }, []); // Array vacío para que se registre solo una vez al montar el componente

  const handleToggleFullscreen = () => {
    if (isFullscreen) {
      // Si ya está en pantalla completa, sal del modo
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    } else {
      // Si no, entra en pantalla completa
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
        document.documentElement.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="roulette-container">
      <div className="pointer">▼</div>
      <div 
        className="wheel" 
        style={{ 
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'none' : 'transform 8s cubic-bezier(0.15, 0, 0.15, 1)' 
        }}
      >
        {prizes.map((p, i) => (
          <div key={i} className="segment" style={{ '--i': i, '--total': prizes.length }}>
            <span>{p}</span>
          </div>
        ))}
      </div>
      <button id="btnScreen" onClick={handleToggleFullscreen}>
            {isFullscreen ? <img src={min}></img> : <img src={max}></img>}
      </button>
    </div>
  );
};

export default Ruleta;