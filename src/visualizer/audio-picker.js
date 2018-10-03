import * as d3 from 'd3';
import { changeAudioSrc } from './audio-setup';


function renderAudioPicker(tracks) {
  d3.select('#audio-picker-root')

    .append('p')
    .text('pick audio: ')

    .append('select')
    .attr('id', 'track-selection')
    .selectAll('option')
    .data(tracks).enter()

      .append('option')
      .attr('value', track => track.filename)
      .text(track => track.trackName);


  const selectEl = document.querySelector('#track-selection');
  selectEl.addEventListener('change', e => {
    changeAudioSrc(e.target.value)
  });
}


export { renderAudioPicker };