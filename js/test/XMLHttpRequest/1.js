var x = new XMLHttpRequest();

// Open a request to a URL
x.open('GET', 'https://example.com', true);

// Attach event listeners for the various events
x.addEventListener('loadstart',  e => { console.log('Request started'               , e ); });
x.addEventListener('progress',   e => { console.log('Request in progress'           , e ); });

x.addEventListener('load',       e => { console.log('Request completed'             , e ); });
x.addEventListener('abort',      e => { console.log('Request was aborted'           , e ); });
x.addEventListener('error',      e => { console.log('Request resulted in an error'  , e ); });
x.addEventListener('timeout',    e => { console.log('Request timed out'             , e ); });

x.addEventListener('loadend',    e => { console.log('Request completed or failed'   , e ); });

// Send the request
x.send();
