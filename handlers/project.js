const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const child_process = require('child_process');

const { createFile, copyFile } = require('../utils/files');
const {
  routes,
  rootFiles,
  srcFiles,
  appFiles,
  appStatesHomeFiles,
  images
} = require('../templates/filenames');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'name:',
    validate: name => {
      if (Boolean(name)) {
        try {
          fs.statSync(`./${ name }`);
          return 'Project already exists';
        } catch (error) {
          return true;
        }
      } else {
        return 'Name is required';
      }
    }
  },
  {
    type: 'input',
    name: 'version',
    message: 'version:',
    default: '0.0.1'
  },
  {
    type: 'input',
    name: 'description',
    message: 'description:'
  },
  {
    type: 'input',
    name: 'author',
    message: 'author:'
  },
  {
    type: 'input',
    name: 'license',
    message: 'license:',
    default: 'MIT'
  },
  {
    type: 'list',
    name: 'private',
    message: 'private:',
    default: 'true',
    choices: ['true', 'false']
  }
];

module.exports.projectHandler = () => new Promise((resolve, reject) => {

  inquirer.prompt(questions).then(options => {

    routes.forEach(route => {
      fs.mkdirSync(`./${ options.name }${ route }`);
    });

    rootFiles.forEach(file => {
      createFile(options.name, file, options);
    });

    srcFiles.forEach(file => {
      createFile(`${ options.name }/src`, file, options);
    });

    appFiles.forEach(file => {
      createFile(`${ options.name }/src/app`, file, options);
    });

    images.forEach(image => {
      copyFile(`${ options.name }/src/images`, image);
    });

    appStatesHomeFiles.forEach(file => {
      createFile(`${ options.name }/src/app/states/home`, file, options, true);
    });

    console.log(chalk.green('Installing dependencies!'));

    try {
      child_process.execSync(`cd ./${ options.name } && yarn install`);
    } catch (error) {
      reject('Cannot install dependencies!');
    }

    resolve(`Project "${ options.name }" created!`);
  });
});
