/src/main/resources/static
├── index.html              (Main app shell)
├── serviceworker.js        (For SPA offline caching)
├── /views
│   ├── home.html           (HTML content for the home view)
│   ├── about.html          (HTML content for the about view)
│   ├── contact.html        (Additional view example)
├── /scripts
│   ├── main.js             (Entry point)
│   ├── /core
│   │   └── App.js          (App logic and route configuration)
│   ├── /router
│   │   └── Router.js       (Router logic for SPA navigation)
│   ├── /utils
│   │   └── util.js         (Utility functions for HTTP requests and common loader)
├── /styles
│   └── styles.css          (Optional CSS)
