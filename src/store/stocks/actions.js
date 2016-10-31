import * as types from './action-types';

import xml2js from 'xml2js';
const parseString = xml2js.parseString;

import modService from '../../services/markitondemand';

export function fetchPrice (symbol) {
  return async(dispatch, getState) => {
    try {
    	dispatch({ type: types.STOCK_LOADING });
      const stockXML = await modService.getLastPrice(symbol);
      const stockPrices = await modService.getLastDays(symbol, 15);
			parseString(stockXML, (err, stockMeta) => {
				const stockData = {
					stockMeta,
					stockPrices
				};
        dispatch({ type: types.STOCK_FETCHED, stockData });
			});
    } catch (error) {
      console.error(error);
    }
  };
}

export function clearCurrentStock () {
  return async(dispatch, getState) => {
    try {
      dispatch({ type: types.STOCK_CLEAR });
    } catch (error) {
      console.log(error);
    }
  }
}

export function saveStock (stock) {
  return async(dispatch, getState) => {
    try {
      dispatch({ type: types.STOCK_SAVE, stock });
    } catch (error) {
      console.log(error);
    }
  }
}

export function unsaveStock (stock) {
  return async(dispatch, getState) => {
    try {
      dispatch({ type: types.STOCK_UNSAVE, stock });
    } catch (error) {
      console.log(error);
    }
  }
}

