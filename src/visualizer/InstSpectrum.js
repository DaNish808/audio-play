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
    const { frequencyData: data } = this.props;

    return (
      <div>
        {/* <section className="frequency-sum">
          <h2>frequency sum</h2>
          <p>
            {data.reduce((str, Hz) => str += Hz, 0)}
          </p>
        </section> */}
        <section className="raw-data">
          {/* <h2>raw data</h2> */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              height: '25vh',
              width: '100%'
            }}>
              {data.map((hz, i) => {
                return <div key={i} style={{ 
                  display: 'inline-block',
                  width: `${audRangePercent}%`,
                  height: `${hz / 255 * 100}%`,
                  backgroundColor: `hsl(${105 + hz}, 100%, 50%)`
                }}></div>
              })}
            </div>
        </section>
      </div>
    )
  }
}

export default InstSpectrum;