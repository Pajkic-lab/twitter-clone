import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for react-router v7
if (typeof global.TextEncoder === 'undefined') {
  const util = require('util');
  global.TextEncoder = util.TextEncoder;
  global.TextDecoder = util.TextDecoder;
}
