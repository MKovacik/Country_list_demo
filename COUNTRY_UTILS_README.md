# Country Data Utility Functions

This utility module provides functions to extract and flatten country data from the REST Countries API format (`countries.json`) into a simplified format suitable for table display.

## Features

- ✅ Extracts and flattens nested country data
- ✅ Converts languages object to comma-separated string
- ✅ Handles missing or malformed data gracefully (returns 'N/A' or empty string)
- ✅ Works in both Node.js and browser environments
- ✅ Fully documented with JSDoc comments
- ✅ Includes comprehensive examples

## Installation

No installation required! Simply include the `countryUtils.js` file in your project.

### For Node.js

```javascript
const { flattenCountryFields, formatNumber } = require('./countryUtils.js');
```

### For Browser

```html
<script src="countryUtils.js"></script>
<script>
  // Functions available at window.CountryUtils
  const flattened = window.CountryUtils.flattenCountryFields(country);
</script>
```

## API Reference

### `flattenCountryFields(country)`

Extracts and flattens a single country object.

**Parameters:**
- `country` (Object): Country object from countries.json

**Returns:** Object with the following fields:
- `name` (string): Common country name
- `region` (string): Geographic region
- `capital` (string): Primary capital city
- `languages` (string): Comma-separated list of languages
- `population` (number|string): Population count or 'N/A'
- `area` (number|string): Area in km² or 'N/A'
- `flagUrl` (string): URL to PNG flag image

**Example:**
```javascript
const country = {
  name: { common: "France" },
  region: "Europe",
  capital: ["Paris"],
  languages: { fra: "French" },
  population: 67391582,
  area: 551695,
  flags: { png: "https://flagcdn.com/w320/fr.png" }
};

const flattened = flattenCountryFields(country);
// Returns:
// {
//   name: "France",
//   region: "Europe",
//   capital: "Paris",
//   languages: "French",
//   population: 67391582,
//   area: 551695,
//   flagUrl: "https://flagcdn.com/w320/fr.png"
// }
```

### `flattenCountriesArray(countries)`

Flattens an array of country objects.

**Parameters:**
- `countries` (Array): Array of country objects

**Returns:** Array of flattened country objects

**Example:**
```javascript
const countries = [country1, country2, country3];
const flattened = flattenCountriesArray(countries);
```

### `formatLanguages(languages)`

Converts a languages object to a comma-separated string.

**Parameters:**
- `languages` (Object): Object mapping language codes to language names

**Returns:** Comma-separated string or 'N/A'

**Example:**
```javascript
formatLanguages({ eng: "English", fra: "French" });
// Returns: "English, French"
```

### `formatNumber(num)`

Formats a number with thousands separator.

**Parameters:**
- `num` (number): Number to format

**Returns:** Formatted string or 'N/A'

**Example:**
```javascript
formatNumber(1234567);
// Returns: "1,234,567"
```

## Usage Examples

### Example 1: Node.js - Process all countries

```javascript
const fs = require('fs');
const { flattenCountriesArray } = require('./countryUtils.js');

// Read countries.json
const countries = JSON.parse(fs.readFileSync('./countries.json', 'utf-8'));

// Flatten all countries
const flattened = flattenCountriesArray(countries);

console.log(`Processed ${flattened.length} countries`);
console.log(flattened[0]); // First country
```

### Example 2: Browser - Fetch and display in table

```javascript
fetch('countries.json')
  .then(response => response.json())
  .then(countries => {
    const flattened = countries.map(country => 
      window.CountryUtils.flattenCountryFields(country)
    );
    
    // Now use flattened data to populate your table
    displayTable(flattened);
  });
```

### Example 3: Handling missing data

```javascript
const incompleteCountry = {
  name: { common: "Antarctica" },
  area: 14000000
  // Missing: region, capital, languages, population, flags
};

const flattened = flattenCountryFields(incompleteCountry);
// Returns:
// {
//   name: "Antarctica",
//   region: "N/A",
//   capital: "N/A",
//   languages: "N/A",
//   population: "N/A",
//   area: 14000000,
//   flagUrl: ""
// }
```

## Testing

### Run Node.js Example

```bash
node example-usage.js
```

This will run comprehensive examples showing all features.

### View Browser Test Page

Open `test-utils.html` in a browser (requires a local web server due to CORS):

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Then open http://localhost:8000/test-utils.html
```

## Data Structure

### Input Format (from countries.json)

```json
{
  "name": {
    "common": "France",
    "official": "French Republic"
  },
  "region": "Europe",
  "capital": ["Paris"],
  "languages": {
    "fra": "French"
  },
  "population": 67391582,
  "area": 551695,
  "flags": {
    "png": "https://flagcdn.com/w320/fr.png",
    "svg": "https://flagcdn.com/fr.svg"
  }
}
```

### Output Format (flattened)

```json
{
  "name": "France",
  "region": "Europe",
  "capital": "Paris",
  "languages": "French",
  "population": 67391582,
  "area": 551695,
  "flagUrl": "https://flagcdn.com/w320/fr.png"
}
```

## Error Handling

The utility handles various edge cases:

- **Missing fields**: Returns 'N/A' for strings, 'N/A' for numbers, or empty string for URLs
- **Invalid input**: Returns object with all fields set to 'N/A' or empty string
- **Empty arrays**: Returns 'N/A' (e.g., country with no capital)
- **Empty objects**: Returns 'N/A' (e.g., country with no languages)
- **Null/undefined**: Returns 'N/A' or empty string as appropriate

## Integration with Existing Project

The existing `index.html` already has inline functions that perform similar operations. To integrate this utility:

1. **Option 1: Keep both** - Use the utility for new features or external integrations
2. **Option 2: Refactor** - Replace inline functions in index.html with this utility

## Files Included

- `countryUtils.js` - Main utility module
- `example-usage.js` - Node.js examples and tests
- `test-utils.html` - Browser-based test page
- `COUNTRY_UTILS_README.md` - This documentation

## License

This utility is part of the Country_list_demo project.
