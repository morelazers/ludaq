const API_URL = "http://dev.markitondemand.com/MODApis/Api/v2/";

import moment from 'moment';

class MarkitOnDemand {

	_getFormattedDate (noOfDays) {
		return moment().subtract(noOfDays, 'days').format().toString();
	}

	async getLastPrice (symbol) {
		let url = "Quote?symbol="+symbol;
		try {
			const response = await fetch(API_URL + url, {
				method: "GET"
			});
			let xml = await response.text();
			return xml;
		} catch (error) {
			console.log(error);
		}
	}

	async getLastDays (symbol, daysAgo) {
		let url = "InteractiveChart/jsonp?parameters=";
		let parameters = {
			Normalized: false,
			NumberOfDays: daysAgo,
			DataPeriod: "Day",
			Elements: [{
				Symbol: symbol,
				Type: "Price",
				Params: ["c"]
			}],
		};

		let stringParams = JSON.stringify(parameters);

		url += stringParams;

		try {
			const response = await fetch(API_URL + url, {
				method: "GET"
			});
			let data = await response.text();

			/* 
			 *	for some reason when you call the JSON API you get the response in the form:
			 *
			 *	(function () { })({RESPONSE})
			 *
			 *	So we need to strip the first and last characters before we parse to JSON
			 */

			let removeStartString = "(function () { })(";
			let startRemoved = data.substring(data.indexOf(removeStartString) + removeStartString.length);
			let finalString = startRemoved.substring(0, (startRemoved.length - 1));

			let finalJson = JSON.parse(finalString);

			let stockAveragePrices = this.getStockAveragePrices(finalJson);
			let stockClosePrices = this.getStockClosePrices(finalJson);

			return {
				close: stockClosePrices,
				average: stockAveragePrices
			};
		} catch (error) {
			console.log(error);
		}

	}

	getStockAveragePrices (interactiveChartResponse) {
		const closePrices = interactiveChartResponse.Elements[0].DataSeries.close.values;
		const dates = interactiveChartResponse.Dates;

		let numberOfDays = closePrices.length;

		averagePrices = [];

		let i = (numberOfDays - 4);
		for (i; i <= numberOfDays; i++) {
			// get the last five days average
			let j = 0;
			let cumulativePrice = 0;
			let count = 0;

			for (j = (i - 5); j < i; j++) {
				if (closePrices[j] != undefined) {
					cumulativePrice += closePrices[j];
					count++;
				}
			}
			let averagePrice = (cumulativePrice / count);
			averagePrices.push({price: averagePrice, date: dates[i - 1]});
		}
		return averagePrices;
	}

	getStockClosePrices (interactiveChartResponse) {
		const closePrices = interactiveChartResponse.Elements[0].DataSeries.close.values;
		const dates = interactiveChartResponse.Dates;

		let numberOfDays = closePrices.length;

		lastFiveClosePrices = [];

		let i = (numberOfDays - 4);
		for (i; i <= numberOfDays; i++) {
			lastFiveClosePrices.push({price: closePrices[i - 1], date: dates[i - 1]});
		}
		return lastFiveClosePrices;
	}

}

export default (new MarkitOnDemand());