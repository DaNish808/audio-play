import { dataManip } from './setup';


const bounds = {
  low: 10,
  high: 90
}

const jumpCoord = coord => {
  let newCoord = null;
  while(newCoord < bounds.low || newCoord > bounds.high) {
    newCoord = coord + parseInt(Math.random() * 10 - 5);
  }
  return newCoord;
}

const rotate = r => r + parseInt(Math.random() * 60 - 30);

function initAnimation(interval = 50) {
  setInterval(
    () => dataManip(
      data => ({
        ...data,
        x: jumpCoord(data.x),
        y: jumpCoord(data.y),
        r: rotate(data.r)
      }), 
      interval
    ), 
    interval
  );
}

export default initAnimation;