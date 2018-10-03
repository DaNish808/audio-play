import React, { PureComponent } from 'react';


class RollingSpectrum extends PureComponent {
  constructor() {
    super();
    const totalHeight = 400;
    const totalWidth = 2000;
    const height = totalHeight * 0.85;
    this.state = {
      frames: 0,
      frameWidth: 0.1,
      ctx: null,
      totalHeight,
      totalWidth,
      width: totalWidth,
      height,
      rightOffsetBarWidth: totalWidth * 0.005,
      rightOffset: totalWidth * 0.05
    };
  }

  updateSpectraData = () => {
    const { 
      frames, audRange, ctx, 
      frameWidth,
      totalHeight, totalWidth, 
      width, height, rightOffset, rightOffsetBarWidth
    } = this.state;
    const spectrumStart = this.props.spectrumStart || 0;
    const spectrumEnd = this.props.spectrumEnd || 730;
    const spectrumLength = spectrumEnd - spectrumStart;
    const spectrumData = Array.from(this.props.frequencyData).slice(spectrumStart, spectrumEnd);
    const audRangePercent = height / spectrumLength;

    const xEnd = width;
    const xStart = xEnd - rightOffset;

    
    
    let instAvg = spectrumData.reduce((sum, hz) => sum += hz, 0) / (spectrumLength / 2);
    if(instAvg > 420) instAvg = 420;
    const topBarHeight = totalHeight - height;
    const instAvgHeight = instAvg / 420 * topBarHeight * 0.95;
    const avgHeightOffset = (topBarHeight - instAvgHeight) / 2;
    
    // background for instantaneous data bar (right column)
    ctx.fillStyle = 'black';
    ctx.fillRect(xEnd - rightOffset + 3, 0, rightOffset, totalHeight);

    // instantaneous spectrum data (right lower column)
    spectrumData.forEach((hz, i) => {
      i = i + 1;
      ctx.fillStyle = hz > 2 ? `hsl(${105 + hz}, 100%, ${hz / 2.55}%)` : 'black';
      // ctx.fillStyle = hz > 2 ? `hsl(0, 0%, ${hz / 2.55}%)` : 'black';
      ctx.fillRect(xStart, totalHeight - i * audRangePercent, rightOffset * (hz / 255 * 0.85 + 0.1), audRangePercent);
    });
    
    // instantaneous avg (right upper field)
    ctx.fillStyle = instAvg > 2 ? `hsl(${105 + instAvg}, 100%, ${instAvg / 3.6}%)` : 'black';
    // ctx.fillStyle = instAvg > 2 ? `hsl(0, 0%, ${hz / 3.5}%)` : 'black';
    ctx.fillRect(xEnd - rightOffset, avgHeightOffset, rightOffset * (instAvg / 420 * 0.85 + 0.1), instAvgHeight);
    
    // vertical border shadow
    ctx.fillStyle = 'black';
    ctx.fillRect(xEnd - rightOffset + 3, 0, rightOffsetBarWidth, totalHeight);
        
    // white borders
    ctx.fillStyle = 'white';
    ctx.fillRect(0, topBarHeight, totalWidth, 2);
    ctx.fillRect(xEnd - rightOffset + 5, 0, rightOffsetBarWidth - 4, totalHeight);

    // scroll frame shifter (main scrolling animation)
    ctx.drawImage(this.refs.canvas, -1, 0);

    this.setState({ ...this.state, frames: frames + 1 });
  }

  componentDidMount() {
    const { updateEventName, audioEl } = this.props;
  
    this.setState(state => ({ 
      ...state, 
      updateEventName,
      ctx: this.refs.canvas.getContext('2d')
    }), ( ...args ) => {
      const { ctx, totalHeight, totalWidth } = this.state;
      const margin = 20;
      
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, totalWidth, totalHeight);
      
      audioEl.addEventListener(this.state.updateEventName, this.updateSpectraData);
    });
  }
  
  render() {
    const { totalWidth, totalHeight } = this.state;

    return (
      <canvas className="rolling-spectrum" ref="canvas" width={totalWidth} height={totalHeight} style={{
        width: '100%',
        height: '68vh' // keep equal with .visual-panel height
      }}/>
    );
  }
}

export default RollingSpectrum;