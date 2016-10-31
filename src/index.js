import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as reducers from './store/reducers';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

import {Actions, Scene, Router} from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);

import HomeScreen from './containers/home-screen';
import ResultScreen from './containers/result-screen';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={HomeScreen} title="My Stocks" initial={true}/>
    <Scene key="results" component={ResultScreen} />
  </Scene>
);

class App extends Component {

	render () {
		return (
			<Provider store={store}>
				<RouterWithRedux scenes={scenes} style={styles.avoidStatusBar}/>
			</Provider>
		);
	}

}

const styles = StyleSheet.create({
	avoidStatusBar: {
		flex: 1,
		// marginBottom: Platform.OS === 'ios' ? 55 : 0
	}
});

export default (App);