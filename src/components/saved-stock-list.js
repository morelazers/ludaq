import React, { Component } from 'react';
import { 
	View, 
	Text, 
	ListView, 
	TouchableHighlight,
	StyleSheet 
} from 'react-native';

import SavedStock from './saved-stock';

class SavedStockList extends Component {

	render () {
		let savedStocks = this.props.savedStocks;
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		data = (savedStocks.length > 0) ? savedStocks : [];
		dataSource = dataSource.cloneWithRows(data);
		return (
			<View>
				<ListView
					enableEmptySections={true}
					dataSource={dataSource}
					renderRow={(stock) => {
						return (
							<TouchableHighlight
								onPress={() => this.props.onViewStock(stock)}
							>
								<SavedStock 
									stock={stock}
								/>
							</TouchableHighlight>
						)
					}}
				/>
			</View>
		);
	}

}

export default (SavedStockList);