// /src/main/resources/static/scripts/core/App.js
import Router from '../router/Router.js';
import { populateDropdown } from '../utils/util.js';

export default class App {
    constructor() {
        // Centralized route configuration
        this.router = new Router([
            { path: '/', view: '/views/home.html', init: this.initHome },
            { path: '/about', view: '/views/about.html' },
            { path: '/contact', view: '/views/contact.html', init: this.initContact }  // Contact route with init function
        ]);

        this.setupNavigation();
        this.handleRouteChange();
    }

    setupNavigation() {
        document.querySelectorAll('a[data-link]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const path = anchor.getAttribute('href');
                this.router.navigateTo(path);
                this.handleRouteChange();
            });
        });
    }

    async handleRouteChange() {
        // Load the view using the router
        await this.router.loadRoute();

        const path = window.location.pathname;

        // Call route-specific init functions (if they exist)
        const route = this.router.routes.find(r => r.path === path);
        if (route && route.init) {
            route.init();  // Call the init function (like populating dropdown) after the view is loaded
        }
    }

    // Init function for the Home route
    initHome() {
        populateDropdown('/api/categories', 'categoryDropdown', 'id', 'name');
    }

    // Init function for the Contact route (populates dropdown after loading the view)
    initContact() {
        populateDropdown('https://jsonplaceholder.typicode.com/users', 'userDropdown', 'id', 'name');
    }
}
