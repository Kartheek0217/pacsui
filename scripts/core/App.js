// /src/main/resources/static/scripts/core/App.js
import Router from '../router/Router.js';
import { populateDropdown } from '../utils/util.js';

export default class App {
  constructor() {
    // Define your routes
    this.router = new Router([
      { path: '/', view: '/views/home.html' },
      { path: '/about', view: '/views/about.html' },
      { path: '/newPage', view: '/views/newPage.html' },
    ]);

    // Initialize navigation
    this.setupNavigation();

    // Manually load the initial route
    this.handleRouteChange();
  }

  // Attach event listeners for navigation links
  setupNavigation() {
    document.querySelectorAll('a[data-link]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const path = anchor.getAttribute('href');
        this.router.navigateTo(path);
        this.handleRouteChange(); // Handle route change on navigation
      });
    });
  }

  // Handle route changes and perform route-specific actions
  async handleRouteChange() {
    // Call the router to load the current route
    await this.router.loadRoute();

    // After route has been loaded, perform actions specific to the route
    const path = window.location.pathname;

    // If the current route is '/', populate the dropdown
    if (path === '/') {
      populateDropdown(
        'https://freetestapi.com/api/v1/airlines',
        'categoryDropdown',
        'id',
        'name'
      );
    }
  }
}
