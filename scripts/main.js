// /src/main/resources/static/scripts/main.js
import App from './core/App.js';
import { populateDropdown } from './utils/util.js';

// Start the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  // Populate a dropdown with data from a REST API endpoint
  populateDropdown(
    'https://freetestapi.com/api/v1/airlines',
    'categoryDropdown',
    'id',
    'name'
  );
});
