import * as d3 from 'd3';
import { getPath } from '../../services/firebase/api.js';
import shortID from 'shortid';


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

module.exports = { AudioParser };