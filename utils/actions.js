const { projectHandler } = require('../handlers/project');

module.exports.checkArgs = command => new Promise((resolve, reject) => {
  switch (command) {
    case 'project':
      projectHandler().then(
        response => resolve(response),
        error => reject(error)
      );
      break;
    default:
      reject('COMAND NOT FOUND');
      break;
  }
});
