import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class SavedStock extends Component {

	_isTrendingUp (meta) {
		if (meta.Change[0] > 0) return true;
		return false;
	}

	setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

	render () {
		stock = this.props.stock;
		meta = stock.stockMeta.StockQuote;
		rising = this._isTrendingUp(meta);
		return (

			<View 
				ref={component => this._root = component} {...this.props}
				style={styles.savedStock}
			>
				<View style={styles.stockNameContainer}>
					<Text style={styles.stockName}>{meta.Name[0]} ({meta.Symbol[0]})</Text>
				</View>
				<View style={styles.stats}>
					<View style={styles.stockStat}>
						<Icon
							style={[styles.statIcon, rising ? styles.rising : styles.falling]}
							name={rising ? "trending-up" : "trending-down"}
							size={30}
						/>
						<Text style={styles.statText}>
							{meta.LastPrice[0]}
						</Text>
						<Text style={[styles.statText, rising ? styles.rising : styles.falling]}>
							({(Math.floor(meta.ChangePercent[0] * 100) / 100)})
						</Text>
					</View>
				</View>
			</View>
		);
	}

}

export default (SavedStock);

const styles = StyleSheet.create({
	savedStock: {
		flex: 1,
		borderColor: "black",
		borderWidth: 1,
		backgroundColor: "lightgrey",
		padding: 10,
		margin: 5
	},
	stockNameContainer: {
		flex: 1,
		flexDirection: "row",
		// backgroundColor: "red",
	},
	stockName: {
		fontSize: 18,
	},
	stats: {
		flexDirection: "row",
		justifyContent: "flex-start",
		paddingTop: 5
	},
	stockStat: {
		alignItems: "center",
		flexDirection: "row",
		paddingRight: 10
	},
	statIcon: {
		paddingRight: 5
	},
	statText: {
		paddingRight: 5
	},
	rising: {
		color: "green",
	},
	falling: {
		color: "red",
	}
});