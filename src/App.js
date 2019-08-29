import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Err from './components/Err/Err';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  alert: '',
  user: {
    id: '1',
    name: 'Guest',
    email: '',
    entries: '',
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateFaceLocation = data => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const box = [];
    const faces = data.outputs[0].data.regions;
    faces.map(face => {
      let clarifaiFace = face.region_info.bounding_box;
      let age = face.data.face.age_appearance.concepts[0].name;
      let sex = face.data.face.gender_appearance.concepts[0].name;
      let gender = sex === 'masculine' ? 'male' : 'female';
      let race = face.data.face.multicultural_appearance.concepts[0].name;
      return box.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
        age: age,
        gender: gender,
        race: race
      });
    });
    return box;
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input, alert: '' });
    fetch('https://lit-island-91206.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://lit-island-91206.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => {
        console.log(err.message);
        if (err.message === "Cannot read property '0' of undefined") {
          this.setAlert(
            'Not a picture. Please check the URL and try again',
            10000
          );
        } else {
          this.setAlert('No faces detected. Please try another picture', 10000);
        }
      });
  };

  onRouteChange = route => {
    if (this.state.user.name === 'Guest') {
      if (route === 'home') {
        this.setState({ isSignedIn: false });
      } else if (route === 'signin') {
        this.setState(initialState);
      }
    } else if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  setAlert = (msg, timeout) => {
    this.setState({ alert: msg });
    setTimeout(() => {
      this.setState({ alert: '' });
    }, timeout);
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <Err message={this.state.alert} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <Signin
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            setAlert={this.setAlert}
            alert={this.state.alert}
          />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            setAlert={this.setAlert}
            alert={this.state.alert}
          />
        )}
      </div>
    );
  }
}

export default App;
