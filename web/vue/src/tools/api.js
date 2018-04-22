// global window.CONFIG
// import CONFIG from '../../UIconfig'

const config = { ssl: window.location.protocol === 'https:' }
const endpoint = window.location.host + '/'; // `${config.host}${config.port === 80 ? '' : `:${config.port}`}${config.path}`;

let basePath, restPath, wsPath;

// rest API path
if(config.ssl) {
  basePath = `https://${endpoint}`;
} else {
  basePath = `http://${endpoint}`;
}

restPath = basePath + 'api/';

// ws API path
if(config.ssl) {
  wsPath = `wss://${endpoint}/api`;
} else {
  wsPath = `ws://${endpoint}/api`;
}

export {
  wsPath,
  restPath,
  basePath
};
