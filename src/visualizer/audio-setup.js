import * as d3 from 'd3';
import { getPath } from '../../services/firebase/api.js';


const audioData = {
  frequencyData: null,
  waveformData: null,
  audioUpdateEvent: 'audioDataUpdate'
};

async function renderAudioEl(src) {

  d3.select('#audio-el-root')
  .append('audio').attr('id', 'target-audio')
  .attr('src', await getPath(src))
  .attr('crossorigin', 'anonymous')
  .attr('controls', true)
  .style('width', '100%')
  // .attr('autoplay')
  
  const audioEl = document.getElementById('target-audio');
  return audioEl;
}

async function changeAudioSrc(src) {
  d3.select('audio#target-audio')
    .attr('src', await getPath(src));
}

function connectAudioData(audioEl) {
  
  let audioIsOn = false;
  
  const ctx = new AudioContext();
  const audioSrc = ctx.createMediaElementSource(audioEl);
  audioSrc.connect(ctx.destination);
  const analyzer = ctx.createAnalyser();
  audioSrc.connect(analyzer);

  audioData.frequencyData = new Uint8Array(analyzer.frequencyBinCount);
  audioData.waveformData = new Uint8Array(analyzer.frequencyBinCount);
  

  audioEl.addEventListener('play', () => {
    audioIsOn = true;
    renderFrame();
  });
  audioEl.addEventListener('pause', () => {
    audioIsOn = false;
  });

  function renderFrame() {
    if(audioIsOn) {
      requestAnimationFrame(renderFrame);
      analyzer.getByteFrequencyData(audioData.frequencyData);
      analyzer.getByteTimeDomainData(audioData.waveformData);
      document.querySelector('#target-audio')
              .dispatchEvent(new CustomEvent(audioData.audioUpdateEvent, { bubbles: true }))
    }
  }

  return audioData;
}

function getAudioData() {
  return audioData;
}


export { renderAudioEl, changeAudioSrc, connectAudioData, getAudioData };