import React from 'react';
import { request } from 'http';


class InstSpectrum extends React.Component {
  constructor() {
    super();
    this.state = {
      audRangePercent: 100 / 1024
    }
  }
  
  componentDidMount() {
    const { audRange } = this.props;

    if(audRange) {
      this.setState({ 
        ...this.state, audRangePercent: 100 / audRange
      })
    }
  }

  render() {
    const { audRangePercent } = this.state;
    const { waveformData: data } = this.props;

    return (
      <div>
        {/* <section className="frequency-sum">
          <h2>frequency sum</h2>
          <p>
            {data.reduce((str, Hz) => str += Hz, 0)}
          </p>
        </section> */}
        <section className="wave-data">
          {/* <h2>raw data</h2> */}
            <div>
              {data.map((hz, i) => {
                return hz
              })}
            </div>
        </section>
      </div>
    )
  }
}

export default InstSpectrum;