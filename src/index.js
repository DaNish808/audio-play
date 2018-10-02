import './styles/main.css';

import firebase from '../services/firebase/api.js';

import mountVisualPanel from './visualizer/VisualPanel';
import { renderAudio } from './visualizer/audio-setup.js';
import { renderAudioPicker } from './visualizer/audio-picker';
import { initWaveform } from './visualizer/wave-form.js';

const audioTracks = [
  {
    name: 'ghibli',
    src: 'ghibli.mp3'
  },
  {
    name: 'nightsky',
    src: 'nightSky.mp3'
  },
  {
    name: 'acapella',
    src: 'acapella.mp3'
  },
  {
    name: 'hanazeve',
    src: 'hanazeve.mp3'
  },
  {
    name: 'win',
    src: 'All I Do Is Win.mp3'
  },
  {
    name: 'roar',
    src: 'Roar.mp3'
  },
  {
    name: 'asmr',
    src: 'ASMR.mp3'
  },
  {
    name: 'animals',
    src: 'Animals.mp3'
  },
  {
    name: 'crisis',
    src: 'Constitutional Crisis.mp3'
  },
];

async function main() {
  const audioEl = await renderAudio('ghibli.mp3');
  mountVisualPanel(audioEl);
  renderAudioPicker(audioTracks);
  initWaveform();

}

main();
