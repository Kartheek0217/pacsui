// /src/main/resources/static/scripts/router/Router.js

export default class Router {
  constructor(routes) {
      this.routes = routes; // Receive routes from the App class
      this.loadInitialRoute();
      window.addEventListener('popstate', () => this.loadRoute());
  }

  async loadRoute() {
      const path = window.location.pathname;
      const route = this.routes.find(r => r.path === path);
      if (route && route.view) {
          const htmlContent = await this.fetchHTML(route.view);
          document.querySelector('#app').innerHTML = htmlContent;
      } else {
          document.querySelector('#app').innerHTML = '<h1>404 - Page Not Found</h1>';
      }
  }

  loadInitialRoute() {
      this.loadRoute();  // Load the current path route
  }

  navigateTo(path) {
      history.pushState({}, '', path);
      this.loadRoute();  // Navigate without refreshing
  }

  async fetchHTML(view) {
      try {
          const response = await fetch(view);
          if (!response.ok) throw new Error(`Failed to load view: ${view}`);
          return await response.text();
      } catch (error) {
          console.error(error);
          return `<h1>Error loading view</h1>`;
      }
  }
}
