const axios = require("axios").default;
const { insertBlockData } = require("./db/blocksTableOperate");

function dateIsValid(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (String(dateStr).match(regex) === null) {
        return false;
    }

    const date = new Date(dateStr);

    const timestamp = date.getTime();

    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
        return false;
    }

    return date.toISOString().startsWith(dateStr);
}

function appendLeadingZeroes(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n;
}
function getFormattedDate(date) {
    let current_datetime = new Date(date);
    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        appendLeadingZeroes(current_datetime.getMonth() + 1) +
        "-" +
        appendLeadingZeroes(current_datetime.getDate());
    return formatted_date;
}
function getFormattedTime(date) {
    let data = new Date(date);
    let hrs = data.getHours();
    let mins = data.getMinutes();
    if (hrs <= 9) hrs = "0" + hrs;
    if (mins < 10) mins = "0" + mins;
    const postTime = hrs + ":" + mins + ":00";
    return postTime;
}

/**
 *
 * @param date format : '2020-05-20'
 */
const collectTradeData = async (date) => {
    const formatted_date = dateIsValid(date)
        ? date
        : getFormattedDate(new Date());
    const DATA_URL = `https://www.cmegroup.com/services/blocktrades-search?tradeDate=${formatted_date}&sortField=entryDateUTC&sortOrder=desc&pageSize=10000`;
    return axios.get(DATA_URL).then(async (response) => {
        if (response.status >= 400) {
            console.log("Server Error");
            return;
        }
        if (response.data.error) {
            console.log("Error is occured.");
            return;
        }
        let totalRows = response.data.total;

        let results = response.data.results;
        console.log(totalRows);
        for (const element of results) {
            let transaction_id = element.entryId;
            let datetime = element.entryDateUTC;
            let date = getFormattedDate(datetime);
            let time = getFormattedTime(datetime);
            let type = element.secType;
            let size = element.size;
            let net_price = element.price;
            if (element["tradeLegs"] !== undefined) {
                for (const elem of element["tradeLegs"].legs) {
                    let products = elem.legProductName;
                    let sym = elem.legSymbol;
                    let ratio = elem.legRatio;
                    let qty = elem.legSize;
                    let strike = elem.legStrike;
                    let bs = elem.legSide;
                    let price = elem.legPrice;
                    await insertBlockData(
                        transaction_id,
                        datetime,
                        date,
                        time,
                        products,
                        type,
                        sym,
                        size,
                        ratio,
                        qty,
                        net_price,
                        strike,
                        bs,
                        price
                    );
                }
            } else {
                let products = element.productName;
                let sym = element.symbol;
                let ratio = 1;
                let qty = element.size;
                let strike = "";
                let bs = "";
                let price = element.price;
                await insertBlockData(
                    transaction_id,
                    datetime,
                    date,
                    time,
                    products,
                    type,
                    sym,
                    size,
                    ratio,
                    qty,
                    net_price,
                    strike,
                    bs,
                    price
                );
            }
        }
        return "Successfully inserting into table.";
    });
};

module.exports = collectTradeData;
