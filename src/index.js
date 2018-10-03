import './styles/main.css';

import mountVisualPanel from './visualizer/VisualPanel';
import { AudioParser } from './visualizer/audio-setup.js';
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
  const audioParser = new AudioParser('ghibli.mp3', '#audio-el-root');
  const audioEl = await audioParser.buildAudioEl();
  const audioData = audioParser.connectData();
  mountVisualPanel(audioEl, audioData);
  initWaveform(audioData);
  renderAudioPicker(audioTracks);
}

main();