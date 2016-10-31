import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import StockSymbolInput from '../components/stock-symbol-input';
import StockPriceResults from '../components/stock-price-results';

import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

import * as stockActions from '../store/stocks/actions';
import * as stockSelectors from '../store/stocks/reducer';

class ResultScreen extends Component {

	onSubmitStockLookup (symbol) {
		Actions.refresh({ title: "Loading..." });
		this.props.dispatch(stockActions.fetchPrice(symbol));
	}

	onSaveStock (stock) {
		this.props.dispatch(stockActions.saveStock(stock));
	}

	onUnsaveStock (stock) {
		this.props.dispatch(stockActions.unsaveStock(stock));
	}

	render () {
		return (
			<View style={styles.avoidStatusBar}>
				<StockPriceResults 
					stock={this.props.stockResults} 
					loading={this.props.loading}
					savedStocks={this.props.savedStocks}
					onSaveStock={this.onSaveStock.bind(this)}
					onUnsaveStock={this.onUnsaveStock.bind(this)}
				/>
				<StockSymbolInput onSubmit={this.onSubmitStockLookup.bind(this)}/>
			</View>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		stockResults: stockSelectors.getStock(state),
		loading: stockSelectors.getLoadingState(state),
		savedStocks: stockSelectors.getSavedStocks(state)
	};
};

export default connect(mapStateToProps)(ResultScreen);

const styles = StyleSheet.create({
	avoidStatusBar: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 55 : 0
	}
});