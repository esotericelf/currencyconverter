import currencySymbolMap from 'currency-symbol-map';
import currencyCodes from 'currency-codes';
import { countries } from 'country-data';

const currencyToCountryCode = (currencyCode) => {
    const manualMapping = {
        KRW: 'KR',
        PHP: 'PH',
        CZK: 'CZ',
        HRK: 'HR',
        USD: 'US',
        TRY: 'TR',
        RUB: 'RU',
    };

    if (manualMapping[currencyCode]) {
        return manualMapping[currencyCode];
    }

    const currency = currencyCodes.code(currencyCode);
    if (currency && currency.countries && currency.countries.length > 0) {
        for (const countryName of currency.countries) {
            if (!countryName) continue;
            const normalizedCountryName = countryName.toLowerCase();
            const country = Object.values(countries).find(c => c.name && c.name.toLowerCase() === normalizedCountryName);
            if (country && country.alpha2) {
                return country.alpha2;
            }
        }
    }

    console.warn(`No mapping found for currency code: ${currencyCode}`);
    return currencyCode;
};

export const parseExchangeRates = (exchangeRates) => {
    console.log('Received exchangeRates:', exchangeRates);

    if (!exchangeRates || typeof exchangeRates !== 'object' || !exchangeRates.data) {
        console.warn('Invalid data structure for exchangeRates');
        return { ratesArray: [] };
    }

    const ratesArray = Object.entries(exchangeRates.data).map(([code, rate]) => {
        const countryCode = currencyToCountryCode(code);
        const symbol = currencySymbolMap(code) || '';
        console.log(`Currency Code: ${code}, Country Code: ${countryCode}, Symbol: ${symbol}`);
        return {
            code,
            rate,
            countryCode,
            symbol
        };
    });

    return { ratesArray };
};