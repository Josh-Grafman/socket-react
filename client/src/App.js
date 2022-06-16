import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io(); // now we have a socket

socket.on('hello', (msg) => {
    console.log(msg);
});

export default class App extends Component {
  state = { data: null };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));

  }

  callBackendAPI = async () => {
    const response = await fetch('/api');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  handleClick = () => {
    //console.log("I'm being clicked!");
    socket.emit('hello', 'HELLO SOCKET.IO!!!');
  };

  render() {
    const {
      handleClick
    } = this;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={handleClick}>Click me</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  };
}
