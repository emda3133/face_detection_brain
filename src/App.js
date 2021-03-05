import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';  // no `.js` at the end!!!
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register.js';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signIn', // keeps track of where we are on the page
  isSignedIn: false,
  user: {  // initialised (so: empty) & no need for password as done the encrypted way
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


class App extends Component {
  constructor() {  // so that it knows the STATE of our website
    super()
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // Connecting to back end here to apis/SmartBrain_BackEnd //
  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)  // the same as (data => console.log(data))
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;  // these give percentages!!
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("width:", width,"height:", height);
    console.log("clarifaiFace:", clarifaiFace);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      // boxWidth: width - (width - (clarifaiFace.right_col * width)) - clarifaiFace.left_col * width
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {  // event listener (input is the image to display)
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    // 'Detect' button
    this.setState({imageUrl: this.state.input});  // displays the image
    // --- MOVE THIS TO BACK END --- //
    // app.models
    //   .predict(
    //     Clarifai.FACE_DETECT_MODEL,  // .COLOR_MODEL, .GENERAL_MODEL etc (view all models below)
    //     this.state.input) // `input`, NOT `imageURL`!!!
    fetch('https://fierce-hollows-30962.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://fierce-hollows-30962.herokuapp.com/image', {
            method: 'put',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }));
          })
          .catch(console.log)  // error handling
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
      // this.setState(initialState.isSignedIn = true);
    }
    this.setState({route: route});
    console.log(initialState);
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
              />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
            route === 'signIn'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;

// must use 'this.' for this.onInputChange! access from class
// all models in Clarifai:
//    https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
