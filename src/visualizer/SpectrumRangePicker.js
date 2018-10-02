import React, { PureComponent } from 'react';

import mousePosition from 'mouse-position';


class SpectrumRangePicker extends PureComponent {
  constructor() {
    super();
    this.state = {
      mouseIsDown: false,
      handle: '',  // 'min' | 'max' | ''
      mouse: null
    }
  }

  // Spectrum value to percent/spectrum value
  specToPct = spec => `${spec / (this.props.max - this.props.min) * 100}%`
  // Percent/spectrum to spectrum
  pctToSpec = pct => parseInt(pct / 100 * (this.props.max - this.props.min) + this.props.min)

  handleMouseClick = (handle, mouseDown) => e => {
    if(mouseDown) {
      e.preventDefault();
      if(!this.state.mouseIsDown) {
        this.setState({ mouseIsDown: true, handle });
      }
    }
    else {
      this.setState({ mouseIsDown: false, handle: '' });
    }
  }

  handleMouseMove = e => {
    e.preventDefault();

    const { mouseIsDown, handle } = this.state;
    const { setRangeStart, setRangeEnd, max, min } = this.props;

    if(this.state.mouseIsDown) {
      const totalHeight = this.refs.range.clientHeight;
      const mouseHeight = totalHeight - this.state.mouse[1];

      let percentHeight = mouseHeight / totalHeight * 100;
      if(percentHeight > 100) percentHeight = 100;
      else if(percentHeight < 0) percentHeight = 0;

      const spectrumValue = this.pctToSpec(percentHeight);

      switch(handle) {
        case 'min': setRangeStart(spectrumValue > max - 1 ? max - 1 : spectrumValue);
        break;
        case 'max': setRangeEnd(spectrumValue < min + 1 ? min + 1 : spectrumValue);
        break;
        default: return;
      }
    }
  }

  componentDidMount() {
    const mouse = mousePosition(this.refs.range);
    mouse.on('move', this.handleMouseMove);
    this.setState({
      ...this.state,
      mouse
    })
  }

  render() {
    const { 
      rangeStart, rangeEnd, max, min
    } = this.props;
    return (
      <div className="range-container"
        onMouseLeave={this.handleMouseClick(null, false)}
        onMouseUp={this.handleMouseClick(null, false)}
      >
        <h4>Max: {rangeEnd}</h4>
        <div className="range-groove"></div>
        <div className="range"
          onMouseMove={this.handleMouseMove}
          ref="range"
        >
          <div className="range-bar">
            <div className="max-handle range-handle" 
              onMouseDown={this.handleMouseClick('max', true)}
              style={{ bottom: this.specToPct(rangeEnd) }}
              ></div>
              <div className="min-handle range-handle" 
              onMouseDown={this.handleMouseClick('min', true)}
              style={{ bottom: this.specToPct(rangeStart) }}
            ></div>
          </div>
        </div>
        <h4>Min: {rangeStart}</h4>
      </div>
    );
  }
}

export default SpectrumRangePicker;