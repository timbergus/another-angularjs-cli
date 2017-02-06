/* eslint-disable global-require */

require('babel-core/register');

require('glob')(`${ __dirname }/src/**/_test_`, (err, files) => {

  if (err) {
    throw err;
  }

  files.forEach(file => {
    require(file);
  });
});
