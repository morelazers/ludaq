import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chart from 'react-native-chart';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Actions } from 'react-native-router-flux';

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

class StockPriceResults extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sceneTitle: ""
		}
	}

	_getNiceStockTime (string) {

		let date = new Date(string);
		let day = date.getUTCDate();
		let month = date.getUTCMonth() + 1;
		let year = date.getUTCFullYear();
		let dayName = days[date.getUTCDay()];

		let pad = "00";
		let hours = pad.substring(0, pad.length - date.getUTCHours().toString().length) + date.getUTCHours();
		let minutes = pad.substring(0, pad.length - date.getUTCMinutes().toString().length) + date.getUTCMinutes();
		let seconds = pad.substring(0, pad.length - date.getUTCSeconds().toString().length) + date.getUTCSeconds();

		let niceString = dayName + " " + day + "/" + month + " - " + hours + ":" + minutes + ":" + seconds;

		return niceString;
	}

	_getNiceAverageTime (string) {
		let date = new Date(string);
		let day = date.getUTCDate();
		let month = date.getUTCMonth() + 1;
		let niceString = day + "/" + month;
		return niceString;
	}

	_setSceneTitle (newTitle) {
		if (this.state.sceneTitle != newTitle) {
			this.state.sceneTitle = newTitle;
			Actions.refresh({ title: newTitle});
		}
	}

	componentWillReceiveProps (props) {
		if (
			props.stock 
			&& !props.stock.loading 
			&& props.stock.stockMeta != undefined
			&& !props.stock.stockMeta.Error
		) {
			this._setSceneTitle(props.stock.stockMeta.StockQuote.Name[0]);
		} else if (props.stock && props.stock.loading) {
			this._setSceneTitle("Loading...");
		}
	}

	render () {
		let loading = this.props.loading;
		if (loading) return this.renderLoading();
		let stock = this.props.stock;
		if (stock == undefined) return this.renderError();
		let stockMeta = stock.stockMeta;
		if (stockMeta == undefined) return this.renderInitial();
		if (stockMeta.Error) return this.renderError();
		let stockQuote = stockMeta.StockQuote;
		if (stockQuote === undefined) return this.renderInitial();

		let thisStockIsSaved = false;
		if (this.props.savedStocks.indexOf(stock) !== -1) {
			thisStockIsSaved = true;
		}

		let closePrices = stock.stockPrices.close;
		let averagePrices = stock.stockPrices.average;

    let closeChartData = closePrices.map((obj) => {
    	return [this._getNiceAverageTime(obj.date), obj.price];
    });
    let averageChartData = averagePrices.map((obj) => {
    	return [this._getNiceAverageTime(obj.date), obj.price];
    });

    chartData = [closeChartData, averageChartData];

		return (
			<View style={styles.fullScreen}>
				<View style={styles.stockNameContainer}>
					<Text style={styles.stockName}>{stockQuote.Name[0]} ({stockQuote.Symbol[0]})</Text>
				</View>
				<View style={styles.stockField}>
					<Text style={styles.stockFieldLabel}>Last price (USD):</Text>
					<Text style={styles.stockFieldValue}>${stockQuote.LastPrice[0]}</Text>
				</View>
				<View style={styles.stockField}>
					<Text style={styles.stockFieldLabel}>Time:</Text>
					<Text style={styles.stockFieldValue}>{this._getNiceStockTime(stockQuote.Timestamp[0])}</Text>
				</View>
				<Chart
	        style={styles.chart}
	        data={chartData}
	        verticalGridStep={5}
	        type="line"
	        showDataPoint={true}
	        color={["blue", "red"]}
       />
       <Icon
       	name={thisStockIsSaved ? "star" : "star-border"}
       	size={50}
       	onPress={() => {
       		!thisStockIsSaved ? this.props.onSaveStock(stock) : this.props.onUnsaveStock(stock)
       	}}
       />
			</View>
		);
	}

	renderLoading () {
		return (
			<View style={styles.fullScreen}>
				<Text>Loading...</Text>
			</View>
		);
	}

	renderInitial () {
		return (
			<View style={styles.fullScreen}>
				<Text>You have not saved any stocks yet</Text>
			</View>
		);
	}

	renderError () {
		return (
			<View style={styles.fullScreen}>
				<Text>Invalid NASDAQ code</Text>
			</View>
		);
	}

}

export default (StockPriceResults);

const styles = StyleSheet.create({
	fullScreen: {
		margin: 20,
		flex: 1
	},
	stockNameContainer: {
		borderBottomWidth: 1,
		borderBottomColor: "black",
		marginBottom: 20,
	},
	stockName: {
		fontSize: 20,
		fontWeight: "bold",
	},
	stockField: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10
	},
	stockFieldLabel: {
		fontSize: 18,
	},
	stockFieldValue: {
		fontSize: 18,
		fontWeight: "bold"
	},
	chart: {
		height: 200,

	}
});