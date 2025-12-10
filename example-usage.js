/**
 * Example Usage of Country Utility Functions
 * 
 * This file demonstrates how to use the countryUtils.js module to flatten
 * country data from countries.json for table display.
 * 
 * To run this example in Node.js:
 *   node example-usage.js
 * 
 * To use in a browser:
 *   Include countryUtils.js via script tag, then use window.CountryUtils
 */

// For Node.js environment
const fs = require('fs');
const { flattenCountryFields, flattenCountriesArray, formatNumber } = require('./countryUtils.js');

// Example 1: Flattening a single country object
console.log('=== Example 1: Flattening a Single Country ===\n');

const sampleCountry = {
    name: {
        common: "France",
        official: "French Republic"
    },
    region: "Europe",
    capital: ["Paris"],
    languages: {
        fra: "French"
    },
    population: 67391582,
    area: 551695,
    flags: {
        png: "https://flagcdn.com/w320/fr.png",
        svg: "https://flagcdn.com/fr.svg"
    }
};

const flattenedCountry = flattenCountryFields(sampleCountry);
console.log('Original country object (simplified):');
console.log(JSON.stringify(sampleCountry, null, 2));
console.log('\nFlattened country object:');
console.log(JSON.stringify(flattenedCountry, null, 2));
console.log('\nFormatted for display:');
console.log(`Name: ${flattenedCountry.name}`);
console.log(`Region: ${flattenedCountry.region}`);
console.log(`Capital: ${flattenedCountry.capital}`);
console.log(`Languages: ${flattenedCountry.languages}`);
console.log(`Population: ${formatNumber(flattenedCountry.population)}`);
console.log(`Area: ${formatNumber(flattenedCountry.area)} km²`);
console.log(`Flag URL: ${flattenedCountry.flagUrl}`);

// Example 2: Handling missing or malformed data
console.log('\n\n=== Example 2: Handling Missing Data ===\n');

const countryWithMissingData = {
    name: {
        common: "Antarctica"
    },
    area: 14000000,
    flags: {
        svg: "https://flagcdn.com/aq.svg"
        // Note: PNG is missing
    }
    // Note: region, capital, languages, and population are missing
};

const flattenedWithMissing = flattenCountryFields(countryWithMissingData);
console.log('Country with missing data:');
console.log(JSON.stringify(flattenedWithMissing, null, 2));
console.log('\nNotice how missing fields are handled with "N/A" or empty string for flagUrl');

// Example 3: Multiple languages
console.log('\n\n=== Example 3: Country with Multiple Languages ===\n');

const multilingualCountry = {
    name: {
        common: "Switzerland"
    },
    region: "Europe",
    capital: ["Bern"],
    languages: {
        fra: "French",
        gsw: "Swiss German",
        ita: "Italian",
        roh: "Romansh"
    },
    population: 8654622,
    area: 41284,
    flags: {
        png: "https://flagcdn.com/w320/ch.png"
    }
};

const flattenedMultilingual = flattenCountryFields(multilingualCountry);
console.log('Flattened Swiss data:');
console.log(JSON.stringify(flattenedMultilingual, null, 2));
console.log(`\nLanguages displayed as: ${flattenedMultilingual.languages}`);

// Example 4: Processing entire countries.json file
console.log('\n\n=== Example 4: Processing All Countries from countries.json ===\n');

try {
    // Read countries.json
    const countriesData = JSON.parse(fs.readFileSync('./countries.json', 'utf-8'));
    
    console.log(`Loaded ${countriesData.length} countries from countries.json`);
    
    // Flatten all countries
    const flattenedCountries = flattenCountriesArray(countriesData);
    
    console.log(`Successfully flattened ${flattenedCountries.length} countries`);
    
    // Display first 3 countries as sample
    console.log('\nFirst 3 countries (flattened):');
    flattenedCountries.slice(0, 3).forEach((country, index) => {
        console.log(`\n${index + 1}. ${country.name}`);
        console.log(`   Region: ${country.region}`);
        console.log(`   Capital: ${country.capital}`);
        console.log(`   Languages: ${country.languages}`);
        console.log(`   Population: ${formatNumber(country.population)}`);
        console.log(`   Area: ${formatNumber(country.area)} km²`);
    });
    
    // Calculate some statistics
    const validPopulations = flattenedCountries
        .filter(c => typeof c.population === 'number')
        .map(c => c.population);
    
    const totalPopulation = validPopulations.reduce((sum, pop) => sum + pop, 0);
    
    console.log(`\n\nStatistics:`);
    console.log(`Total countries: ${flattenedCountries.length}`);
    console.log(`Countries with population data: ${validPopulations.length}`);
    console.log(`Total world population: ${formatNumber(totalPopulation)}`);
    
} catch (error) {
    console.error('Error reading countries.json:', error.message);
    console.log('Make sure countries.json is in the same directory as this script.');
}

// Example 5: Browser usage (commented out, for reference)
console.log('\n\n=== Example 5: Browser Usage ===\n');
console.log('To use this utility in a browser:');
console.log('');
console.log('1. Include the script in your HTML:');
console.log('   <script src="countryUtils.js"></script>');
console.log('');
console.log('2. Use the functions via window.CountryUtils:');
console.log('   const flattened = window.CountryUtils.flattenCountryFields(country);');
console.log('');
console.log('3. Example code:');
console.log(`
   // Fetch and process countries
   fetch('countries.json')
       .then(response => response.json())
       .then(countries => {
           const flattened = countries.map(country => 
               window.CountryUtils.flattenCountryFields(country)
           );
           
           // Display in table or use as needed
           console.log(flattened);
       });
`);
