import './styles/main.css';

import firebase from '../services/firebase/api.js';

import mountVisualPanel from './visualizer/VisualPanel';
import { renderAudioEl, connectAudioData } from './visualizer/audio-setup.js';
import { renderAudioPicker } from './visualizer/audio-picker';
import { initWaveform } from './visualizer/wave-form.js';

const audioTracks = [
  {
    trackName: 'ghibli',
    filename: 'ghibli.mp3'
  },
  {
    trackName: 'nightsky',
    filename: 'nightSky.mp3'
  },
  {
    trackName: 'acapella',
    filename: 'acapella.mp3'
  },
  {
    trackName: 'hanazeve',
    filename: 'hanazeve.mp3'
  },
  {
    trackName: 'win',
    filename: 'All I Do Is Win.mp3'
  },
  {
    trackName: 'roar',
    filename: 'Roar.mp3'
  },
  {
    trackName: 'asmr',
    filename: 'ASMR.mp3'
  },
  {
    trackName: 'animals',
    filename: 'Animals.mp3'
  },
  {
    trackName: 'crisis',
    filename: 'Constitutional Crisis.mp3'
  },
];

async function main() {
  const audioEl = await renderAudioEl('ghibli.mp3');
  connectAudioData(audioEl);
  mountVisualPanel(audioEl);
  initWaveform(audioEl);
  renderAudioPicker(audioTracks);

}

main();

class AudioParser {
  constructor() {
    
  }
}