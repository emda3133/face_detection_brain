import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  // console.log('check', imageUrl)
  console.log("box:", box);  // not percentages, sino hard numbers of the image!
  return(
    <div className='center ma'>
      <div className='absolute ma2'>
        <img id="inputimage" alt="" src={imageUrl} width='500px' height='auto'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        {/*<div className='bounding-box' style={{left: box.leftCol, width: box.boxWidth}}></div>*/}
      </div>
    </div>
  )
}

export default FaceRecognition;

// "https://samples.clarifai.com/face-det.jpg"
// width: box.boxWidth
