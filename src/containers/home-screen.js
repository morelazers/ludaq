import React, { Component } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';

import SavedStockList from '../components/saved-stock-list';
import StockSymbolInput from '../components/stock-symbol-input';

import { Actions, ActionConst } from 'react-native-router-flux';

import { connect } from 'react-redux';

import * as stockActions from '../store/stocks/actions';
import * as stockSelectors from '../store/stocks/reducer';

class HomeScreen extends Component {

	componentDidMount() {
		this.props.dispatch(stockActions.clearCurrentStock());
	}

	onSubmitStockLookup (symbol) {
		Actions.results({ title: "Loading..." });
		this.props.dispatch(stockActions.fetchPrice(symbol));
	}

	onViewStock (stock) {
		Actions.results({ stockResults: stock });
	}

	render () {
		return (
			<View style={styles.fullScreen}>
				<SavedStockList
					onViewStock={this.onViewStock.bind(this)}
					savedStocks={this.props.savedStocks}
				/>
				<View style={styles.stockSearchContainer}>
					<StockSymbolInput 
						onSubmit={this.onSubmitStockLookup.bind(this)}
					/>
				</View>
			</View>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		savedStocks: stockSelectors.getSavedStocks(state)
	}
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
	fullScreen: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 65 : 0,
	},
	stockSearchContainer: {
		position: "absolute",
		bottom: 0,
		width: Dimensions.get('window').width,
		shadowRadius: 4,
    shadowOffset: {width:0, height:-4},
    shadowOpacity: .2,
    shadowColor: "black"
	},
});