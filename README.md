# Country List Demo

A simple web application that displays country information from `countries.json` in an interactive table.

## Features

- 📊 **Interactive Table**: Displays country data with 7 columns:
  - Flag (image)
  - Country Name
  - Region
  - Capital
  - Languages (comma-separated)
  - Population (formatted with thousands separator)
  - Area in km² (formatted with thousands separator)

- 🔄 **Sortable Columns**: Click on any column header to sort the data in ascending or descending order
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 📈 **Statistics**: Shows total countries, total population, and total area at the bottom

## How to View

### Option 1: Using a Local Web Server (Recommended)

Since the page loads JSON data via fetch, you need to serve it through a web server:

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (with npx):
```bash
npx http-server -p 8000
```

#### Using PHP:
```bash
php -S localhost:8000
```

Then open your browser and navigate to: `http://localhost:8000`

### Option 2: Using VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Deploying to GitHub Pages

1. Push the repository to GitHub
2. Go to repository Settings → Pages
3. Select the branch to deploy from
4. Access your page at: `https://[username].github.io/[repository-name]/`

## File Structure

```
Country_list_demo/
├── index.html       # Main HTML page with embedded CSS and JavaScript
├── countries.json   # Country data (from REST Countries API)
└── README.md        # This file
```

## Data Source

The `countries.json` file contains detailed information about countries worldwide, including:
- Names (common, official, native)
- Geographic information (region, subregion, capital, area)
- Demographics (population, languages)
- Flags (PNG and SVG URLs)
- And more...

## Browser Compatibility

This application uses modern JavaScript (ES6+) and should work in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This is a demo project for displaying country data in a table format.
