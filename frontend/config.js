const baseURLS = {
    development: 'http://localhost:5000',
    production: 'http://localhost:5000',
  };
  
  const isLocalhost = window.location.hostname.includes('localhost');
  
  export const baseURL = isLocalhost ? baseURLS.development : baseURLS.production;
  