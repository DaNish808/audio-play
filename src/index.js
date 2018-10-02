import './styles/main.css';

import firebase from '../services/firebase/api.js';

import mountVisualPanel from './visualizer/VisualPanel';
import { renderAudioPicker } from './visualizer/audio-picker';

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

mountVisualPanel('ghibli.mp3');
renderAudioPicker(audioTracks);





// import runBrownian from './brownian/run';
// runBrownian();



// import AWS from 'aws-sdk';
// console.log(AWS.config)

// const bucketRegion = 'us-west-2';
// const IdentityPoolId = 'us-west-2:e1a80f9a-c584-4e01-b285-f7d05b17d001';
// const bucketName = 'visualizer-tracks';

// AWS.config.update({
//   region: bucketRegion,
//   credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId })
// });

// console.log(AWS.config)

// const s3 = new AWS.S3({
  //   // params: { Bucket: bucketName }
// });
// console.log('s3:', s3)