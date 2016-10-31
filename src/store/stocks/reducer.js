import * as types from './action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
	currentStock: {},
	savedStocks: [],
	loading: false
});

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case types.STOCK_FETCHED:
			return state.merge({
				currentStock: action.stockData,
				loading: false
			});
		case types.STOCK_LOADING:
			return state.merge({
				loading: true
			});
		case types.STOCK_CLEAR:
			return state.merge({
				currentStock: {}
			});
		case types.STOCK_SAVE:
			return state.merge({
				savedStocks: state.savedStocks.concat(action.stock)
			});
		case types.STOCK_UNSAVE:
			let index = state.savedStocks.indexOf(action.stock);
			return state.merge({
				savedStocks: state.savedStocks.slice(0, index).concat(state.savedStocks.slice(index + 1))
			});
		default:
			return state;
	}
}

export function getStock (state) {
	return state.stocks.currentStock;
}

export function getLoadingState (state) {
	return state.stocks.loading;
}

export function getSavedStocks (state) {
	return state.stocks.savedStocks;
}