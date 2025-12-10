/**
 * Country Data Utility Functions
 * 
 * This module provides utility functions to extract and flatten country data
 * from the REST Countries API format (countries.json) into a simplified format
 * suitable for table display.
 * 
 * Note: This utility is a standalone module that can be used independently from
 * the existing index.html. While index.html contains similar inline functions
 * (formatLanguages, formatNumber), this module is designed as a reusable library
 * that can be:
 * - Used in Node.js environments
 * - Integrated into other web pages or applications
 * - Used for data processing pipelines
 * - Exported and distributed as a standalone utility
 * 
 * The existing index.html can continue to use its inline functions, or it can
 * optionally be refactored to use this utility module in the future.
 */

/**
 * Extracts and flattens country fields from the nested country object structure.
 * 
 * This function takes a country object from countries.json and returns a flat
 * object with only the essential fields needed for table display:
 * - name: Common country name (from name.common)
 * - region: Geographic region
 * - capital: Primary capital city (from capital[0])
 * - languages: Comma-separated list of languages
 * - population: Population count
 * - area: Area in square kilometers
 * - flagUrl: URL to the PNG flag image
 * 
 * @param {Object} country - The country object from countries.json
 * @param {Object} country.name - Name object containing common, official, and native names
 * @param {string} country.name.common - Common name of the country
 * @param {string} [country.region] - Geographic region
 * @param {string[]} [country.capital] - Array of capital cities
 * @param {Object} [country.languages] - Object mapping language codes to language names
 * @param {number} [country.population] - Population count
 * @param {number} [country.area] - Area in square kilometers
 * @param {Object} [country.flags] - Flag image URLs
 * @param {string} [country.flags.png] - PNG flag image URL
 * 
 * @returns {Object} Flattened country object with fields: name, region, capital, languages, population, area, flagUrl
 * 
 * @example
 * // Example country object from countries.json
 * const country = {
 *   name: { common: "France" },
 *   region: "Europe",
 *   capital: ["Paris"],
 *   languages: { fra: "French" },
 *   population: 67391582,
 *   area: 551695,
 *   flags: { png: "https://flagcdn.com/w320/fr.png" }
 * };
 * 
 * const flattened = flattenCountryFields(country);
 * // Returns:
 * // {
 * //   name: "France",
 * //   region: "Europe",
 * //   capital: "Paris",
 * //   languages: "French",
 * //   population: 67391582,
 * //   area: 551695,
 * //   flagUrl: "https://flagcdn.com/w320/fr.png"
 * // }
 * 
 * @example
 * // Example with missing fields
 * const countryWithMissingData = {
 *   name: { common: "Antarctica" },
 *   area: 14000000
 * };
 * 
 * const flattened = flattenCountryFields(countryWithMissingData);
 * // Returns:
 * // {
 * //   name: "Antarctica",
 * //   region: "N/A",
 * //   capital: "N/A",
 * //   languages: "N/A",
 * //   population: "N/A",
 * //   area: 14000000,
 * //   flagUrl: ""
 * // }
 */
function flattenCountryFields(country) {
    // Validate input
    if (!country || typeof country !== 'object') {
        return {
            name: 'N/A',
            region: 'N/A',
            capital: 'N/A',
            languages: 'N/A',
            population: 'N/A',
            area: 'N/A',
            flagUrl: ''
        };
    }

    return {
        // Extract common name, fallback to 'N/A' if missing
        name: country.name?.common || 'N/A',
        
        // Extract region, fallback to 'N/A' if missing
        region: country.region || 'N/A',
        
        // Extract first capital from array, fallback to 'N/A' if missing
        capital: country.capital?.[0] || 'N/A',
        
        // Convert languages object to comma-separated string
        // If languages is an object, extract values and join with commas
        // Otherwise fallback to 'N/A'
        languages: formatLanguages(country.languages),
        
        // Extract population, fallback to 'N/A' if missing
        // Note: Keep as number for sorting/calculations, use formatNumber() for display
        population: (country.population !== undefined && country.population !== null) 
            ? country.population 
            : 'N/A',
        
        // Extract area, fallback to 'N/A' if missing
        // Note: Keep as number for sorting/calculations, use formatNumber() for display
        area: (country.area !== undefined && country.area !== null) 
            ? country.area 
            : 'N/A',
        
        // Extract PNG flag URL, fallback to empty string if missing
        flagUrl: country.flags?.png || ''
    };
}

/**
 * Converts a languages object to a comma-separated string.
 * 
 * @param {Object} languages - Object mapping language codes to language names
 * @returns {string} Comma-separated list of language names, or 'N/A' if no languages
 * 
 * @example
 * formatLanguages({ eng: "English", fra: "French" })
 * // Returns: "English, French"
 * 
 * formatLanguages(null)
 * // Returns: "N/A"
 */
function formatLanguages(languages) {
    if (!languages || typeof languages !== 'object') {
        return 'N/A';
    }
    
    const languageList = Object.values(languages);
    return languageList.length > 0 ? languageList.join(', ') : 'N/A';
}

/**
 * Formats a number with thousands separator for display.
 * Useful for formatting population and area values.
 * 
 * @param {number} num - The number to format
 * @returns {string} Formatted number with thousands separator, or 'N/A' if invalid
 * 
 * @example
 * formatNumber(1234567)
 * // Returns: "1,234,567"
 * 
 * formatNumber(null)
 * // Returns: "N/A"
 */
function formatNumber(num) {
    if (!num && num !== 0) {
        return 'N/A';
    }
    return num.toLocaleString();
}

/**
 * Processes an array of country objects and returns an array of flattened country objects.
 * This is a convenience function for batch processing multiple countries.
 * 
 * @param {Array<Object>} countries - Array of country objects from countries.json
 * @returns {Array<Object>} Array of flattened country objects
 * 
 * @example
 * const countries = [
 *   { name: { common: "France" }, region: "Europe", ... },
 *   { name: { common: "Germany" }, region: "Europe", ... }
 * ];
 * 
 * const flattened = flattenCountriesArray(countries);
 * // Returns array of flattened country objects
 */
function flattenCountriesArray(countries) {
    if (!Array.isArray(countries)) {
        return [];
    }
    
    return countries.map(country => flattenCountryFields(country));
}

// Export functions for use in other modules
// For browser usage (if loaded via script tag)
if (typeof window !== 'undefined') {
    window.CountryUtils = {
        flattenCountryFields,
        formatLanguages,
        formatNumber,
        flattenCountriesArray
    };
}

// For Node.js/module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        flattenCountryFields,
        formatLanguages,
        formatNumber,
        flattenCountriesArray
    };
}
