import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return(
    <div>
      <p className='intro f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try!'}
      </p>
      <div className="center">
        <div className='form center pa4 br3 shadow-5'>
          <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
          <button
            className="f4 w-30 grow link ph3 pv2 dib white-90 b bg-light-purple"
            onClick={onPictureSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;

// INPUT className="f4 pa2 w-70"
//  - f4: size of whole input box and text inside it
//  - pa2: padding of 2 around the text
//  - w-70: width of input box be 70
//  - center: centre of page

// BUTTON className="w-30"
//  - f4: size of whole button box and text inside it
//  - w-30: width of button box be 30 (have to add to 100!)
//  - grow: grow when you hover over it
//  - pv2: padding height be 2
//  - b: bold
//  - white-90: font colour (`white` changes the font to menlo? adding -90 doesn't)
