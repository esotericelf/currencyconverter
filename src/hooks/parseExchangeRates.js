import currencySymbolMap from 'currency-symbol-map';
import currencyCodes from 'currency-codes';
import { countries } from 'country-data';

// Function to map a currency code to a country code
const currencyToCountryCode = (currencyCode) => {
    // Manual mapping for specific currency codes to country codes
    const manualMapping = {
        KRW: 'KR',
        PHP: 'PH',
        CZK: 'CZ',
        HRK: 'HR',
        USD: 'US',
        TRY: 'TR',
        RUB: 'RU',
    };

    // Return the country code from manual mapping if available
    if (manualMapping[currencyCode]) {
        return manualMapping[currencyCode];
    }

    // Get currency details using currency-codes library
    const currency = currencyCodes.code(currencyCode);
    if (currency && currency.countries && currency.countries.length > 0) {
        // Iterate over countries associated with the currency
        for (const countryName of currency.countries) {
            if (!countryName) continue;
            const normalizedCountryName = countryName.toLowerCase();
            // Find the country object from country-data
            const country = Object.values(countries).find(c => c.name && c.name.toLowerCase() === normalizedCountryName);
            if (country && country.alpha2) {
                return country.alpha2; // Return the alpha-2 country code
            }
        }
    }

    // Log a warning if no mapping is found and return the currency code
    console.warn(`No mapping found for currency code: ${currencyCode}`);
    return currencyCode;
};

// Function to parse exchange rates and map them to country codes and symbols
export const parseExchangeRates = (exchangeRates) => {
    console.log('Received exchangeRates:', exchangeRates);

    // Validate the structure of exchangeRates
    if (!exchangeRates || typeof exchangeRates !== 'object' || !exchangeRates.data) {
        console.warn('Invalid data structure for exchangeRates');
        return { ratesArray: [] }; // Return an empty array if invalid
    }

    // Map exchange rates to an array of objects with additional details
    const ratesArray = Object.entries(exchangeRates.data).map(([code, rate]) => {
        const countryCode = currencyToCountryCode(code); // Get country code
        const symbol = currencySymbolMap(code) || ''; // Get currency symbol
        console.log(`Currency Code: ${code}, Country Code: ${countryCode}, Symbol: ${symbol}`);
        return {
            code, // Currency code
            rate, // Exchange rate
            countryCode, // Country code
            symbol // Currency symbol
        };
    });

    return { ratesArray }; // Return the array of rates with additional details
};