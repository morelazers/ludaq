import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class StockSymbolInput extends Component {

	constructor (props) {
		super(props);
		this.state = {
			text: ""
		};
	}

	render () {
		return (
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<TextInput 
						style={styles.textInput}
						placeholder={"NASDAQ Code..."}
						value={this.state.text}
						onChangeText={(text) => { this.setState({text: text}) }}
						onSubmitEditing={() => {
	          	this.props.onSubmit(this.state.text);
	          }}
	          returnKeyType={"go"}
					/>
					<Icon
						style={styles.submitButton}
						name={"send"}
						size={25}
						onPress={() => {
							this.props.onSubmit(this.state.text)
						}}
					/>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 10,
		shadowOffset: {width: 0, height: 8},
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 6,
		backgroundColor: "white",
		zIndex: 10,
	},
	inputContainer: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		padding: 5,
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
	},
	textInput: {
		marginRight: 10,
		flex: 1
	},
	submitButton: {
		marginLeft: 10,
		color: "blue"
	}
});

export default (StockSymbolInput);