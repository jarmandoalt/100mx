
// Componente para un solo dígito de 7 segmentos
const DigitDisplay = ({ digitValue }) => {
  // Mapeo de los segmentos para cada número (0-9)
  const digits = {
    0: ['a', 'b', 'c', 'd', 'e', 'f'],
    1: ['b', 'c'],
    2: ['a', 'b', 'g', 'e', 'd'],
    3: ['a', 'b', 'g', 'c', 'd'],
    4: ['f', 'g', 'b', 'c'],
    5: ['a', 'f', 'g', 'c', 'd'],
    6: ['a', 'f', 'g', 'e', 'c', 'd'],
    7: ['a', 'b', 'c'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    9: ['a', 'b', 'g', 'c', 'f']
  };

  const activeSegments = digits[digitValue] || [];

  return (
    <div className="digit">
      <div className={`segments a ${activeSegments.includes('a') ? 'on' : ''}`}></div>
      <div className={`segments b ${activeSegments.includes('b') ? 'on' : ''}`}></div>
      <div className={`segments c ${activeSegments.includes('c') ? 'on' : ''}`}></div>
      <div className={`segments d ${activeSegments.includes('d') ? 'on' : ''}`}></div>
      <div className={`segments e ${activeSegments.includes('e') ? 'on' : ''}`}></div>
      <div className={`segments f ${activeSegments.includes('f') ? 'on' : ''}`}></div>
      <div className={`segments g ${activeSegments.includes('g') ? 'on' : ''}`}></div>
    </div>
  );
};

export default DigitDisplay;