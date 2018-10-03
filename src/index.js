import './styles/main.css';

import mountVisualPanel from './visualizer/VisualPanel';
import { renderAudioEl, connectAudioData } from './visualizer/audio-setup.js';
import { renderAudioPicker } from './visualizer/audio-picker';
import { initWaveform } from './visualizer/wave-form.js';

import * as d3 from 'd3';
import { getPath } from '../services/firebase/api.js';
import shortID from 'shortid';

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


class AudioParser {
  constructor(filename, audioParentSelector) {
    this.currentFilename = filename;
    this.audioParentSelector = audioParentSelector;
    this.ID = shortID.generate();
    this.audioElID = `target-audio-${this.ID}`
    this.audioEl = null;
    this.analyzer = null;
    this.audioData = {
      frequencyData: null,
      waveformData: null,
      audioUpdateEvent: `audioDataUpdate-${this.ID}`
    };
    this.controls = {
      isPlaying: false,
    }
  }

  async buildAudioEl() {
    d3.select(this.audioParentSelector)
      .append('audio').attr('id', this.audioElID)
      .attr('src', await getPath(this.currentFilename))
      .attr('crossorigin', 'anonymous')
      .attr('controls', true)
      .style('width', '100%');

    this.audioEl = document.getElementById(this.audioElID);
    return this.audioEl;
  }

  async changeAudioSrc(filename) {
    this.currentFilename = filename;
    d3.select(`audio#${this.audioElID}`)
      .attr('src', await getPath(filename));
  }

  connectData() {
    const ctx = new AudioContext();
    const audioSrc = ctx.createMediaElementSource(this.audioEl);
    audioSrc.connect(ctx.destination);
    this.analyzer = ctx.createAnalyser();
    audioSrc.connect(this.analyzer);

    this.audioData.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount);
    this.audioData.waveformData = new Uint8Array(this.analyzer.frequencyBinCount);
    
    this.audioEl.addEventListener('play', () => {
      this.controls.isPlaying = true;
      this.renderFrame();
    });
    this.audioEl.addEventListener('pause', () => {
      this.controls.isPlaying = false;
    });
  
    return this.audioData;
  }
  
  renderFrame() {
    if(this.controls.isPlaying) {
      requestAnimationFrame(() => this.renderFrame());
      this.analyzer.getByteFrequencyData(this.audioData.frequencyData);
      this.analyzer.getByteTimeDomainData(this.audioData.waveformData);
      document.querySelector('#' + this.audioElID)
              .dispatchEvent(new CustomEvent(this.audioData.audioUpdateEvent, { bubbles: true }));
    }
  }
  
  getAudioData() {
    return this.audioData;
  }

  getAudioEl() {
    return this.audioEl;
  }
}

// async function main() {
//   const audioEl = await renderAudioEl('ghibli.mp3');
//   connectAudioData(audioEl);
//   mountVisualPanel(audioEl);
//   initWaveform(audioEl);
//   renderAudioPicker(audioTracks);
// }

async function main() {
  const audioParser = new AudioParser('ghibli.mp3', '#audio-el-root');
  const audioEl = await audioParser.buildAudioEl();
  audioParser.connectData();
  mountVisualPanel(audioEl, audioParser.getAudioData());
  initWaveform(audioParser.getAudioData());
  renderAudioPicker(audioTracks);
}

main();