/** @type {import('jest').Config} */
const config = {
  verbose: true,
  reporters: [
    'default',
    ['./node_modules/@testomatio/reporter/lib/adapter/jest.js', { apiKey: process.env.TESTOMATIO }],
  ],
};

module.exports = config;
