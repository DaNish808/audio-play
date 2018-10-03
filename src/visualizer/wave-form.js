import { getAudioData } from './audio-setup.js';
import * as d3 from 'd3';

function initWaveform() {
  const { waveformData, audioUpdateEvent } = getAudioData();
  if(!waveformData.length) throw 'initWaveform requires an audio element to function';
  const waveformLength = waveformData.length;
  const svgParams = {
    height: 255,
    width: waveformData.length
  };

  // generate path data string
  // d: d attr path data string
  // a: instantaneous wave amplitude at i
  // i: index
  let pathData = waveformData => waveformData.reduce((d, a, i) => {
    return d += `${i === 0 ? 'M' : 'L'} ${i}, ${a} `;
  }, '');

  const containerEl = d3.select('#waveform-container').classed('hidden', false);
  const svgEl = containerEl.append('svg')
    .attr('viewBox', `0 0 ${svgParams.width} ${svgParams.height}`)
    .attr('preserveAspectRatio', 'none');
  const pathEl = svgEl.append('path')
    .attr('d', pathData(waveformData))
    .attr('stroke', 'blue')
    .attr('stroke-width', '2')
    .attr('fill', 'none');
  document.addEventListener(audioUpdateEvent, () => {
    pathEl.attr('d', pathData(waveformData));
  });

  const range = [128, 128]; // [35, 220]
  let i = 0;
  document.addEventListener(audioUpdateEvent, () => {
    const min = waveformData.reduce((min, n) => range[0] < min ? range[0] : min);
    const max = waveformData.reduce((max, n) => range[1] > max ? range[1] : max);
    if(min < range[0] || max > range[1]) {
      range[0] = min;
      range[1] = max;
      console.log(i + ':', range);
    }
    i++;
  });
}


module.exports = { initWaveform };