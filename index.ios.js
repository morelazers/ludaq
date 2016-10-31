import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/index';

export default class LUDAQ extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('LUDAQ', () => LUDAQ);
