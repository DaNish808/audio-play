
import { initBrownian } from './setup';
import animateBrownian from './animate';


function runBrownian() {
  const animationInterval = 1000;
  
  initBrownian();
  animateBrownian(animationInterval);
} 

export default runBrownian;