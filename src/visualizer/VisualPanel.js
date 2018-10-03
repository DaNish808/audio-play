import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

import RollingSpectrum from './RollingSpectrum';
import SpectrumRangePicker from './SpectrumRangePicker';
import InfoBox from './InfoBox';

import { renderAudio, changeAudioSrc, getAudioData } from './audio-setup';
import * as d3 from 'd3';

import '../styles/VisualPanel.css';
import InstSpectrum from "./InstSpectrum";

class VisualPanel extends PureComponent {
  constructor() {
    super();
    this.state = { 
      frequencyData: [],
      waveformData: [],
      audioIsPlaying: false,
      spectrumStart: 0,
      spectrumEnd: 730,
      updateEventName: 'audioDataUpdate',
    };
  }

  setSpectrumStart = spectrumStart => {
    const { spectrumEnd } = this.state;
    this.setState({ 
      ...this.state, 
      spectrumStart,
      spectrumEnd: spectrumStart >= spectrumEnd ? spectrumStart + 1 : spectrumEnd
    }) 
  }
  setSpectrumEnd = spectrumEnd => {
    const { spectrumStart } = this.state;
    this.setState({ 
      ...this.state, 
      spectrumStart: spectrumEnd <= spectrumStart ? spectrumEnd - 1 : spectrumStart,
      spectrumEnd
    })
  }

  updateAudioData = () => {
    this.setState({ 
      frequencyData: Array.from(this.props.audioData.frequencyData),
      waveformData: Array.from(this.props.audioData.waveformData)
    });
  }

  frequencyWindDown = () => {
    function fade() {
      this.setState(
        {
          ...this.state,
          frequencyData: this.state.frequencyData.map(hz => hz * 0.7)
        }, 
        () => {
          const fadeComplete = this.state.frequencyData.every(hz => hz < 3);
          if(!fadeComplete && !this.state.audioIsPlaying) {
            requestAnimationFrame(fade.bind(this));
          }
        }
      )
    }
    fade.call(this);
  }

  componentDidMount() {
    const { audioEl, updateEventName } = this.props;

    this.updateAudioData();
    if(updateEventName) {
      this.setState({ ...this.state, updateEventName }, () => {
        audioEl.addEventListener(this.state.updateEventName, this.updateAudioData);
      });
    }
    else {
      audioEl.addEventListener(this.state.updateEventName, this.updateAudioData);
    }

    audioEl.addEventListener('play', () => this.setState({ ...this.state, audioIsPlaying: true }));
    audioEl.addEventListener('pause', () => {
      this.setState({ ...this.state, audioIsPlaying: false });
      this.frequencyWindDown();
    });
  }

  render() {
    const { 
      waveformData, frequencyData, 
      audioIsPlaying, 
      spectrumStart, spectrumEnd,
      updateEventName 
    } = this.state;
    const { audioEl } = this.props;

    return (
      <section className="visual-panel">
        <RollingSpectrum 
          audioEl={audioEl}
          frequencyData={frequencyData}
          updateEventName={updateEventName}
          spectrumStart={spectrumStart}
          spectrumEnd={spectrumEnd}
        />
        <InfoBox
        
        />
        <SpectrumRangePicker
          rangeStart={spectrumStart}
          rangeEnd={spectrumEnd}
          min={0}
          max={1024}
          setRangeStart={this.setSpectrumStart}
          setRangeEnd={this.setSpectrumEnd}
        />
      </section>
    );
  }
}


function mountVisualPanel(audioEl) {
  ReactDOM.render(
    <VisualPanel audioEl={audioEl} audioData={getAudioData()}/>, 
    document.getElementById("visual-panel-root")
  );
}

export default mountVisualPanel;