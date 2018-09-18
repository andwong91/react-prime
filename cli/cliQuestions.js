const inquirer = require('inquirer');
const chalk = require('chalk');
const glob = require('glob');
const cliFileMethods = require('./cliFileMethods.js');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const fileDir = glob.sync('**/*.js', { ignore: 'node_modules/**' });

const cliQuestions = [
  {
    type: 'input', // type designates what type of prompt the user sees, creates a prompt that takes text as an answer
    name: 'projectName', // name is the property the answer to this prompt is saved as
    message: chalk.red('Input your project name'), // message is what the user sees on screen
    validate(answer) {
      // if a user typed nothing or only spaces, make the user type again
      if (answer.length === 0 || answer.trim().length === 0) {
        return 'You must type your project name';
      }
      return true;
    },
  },
  {
    type: 'autocomplete',
    name: 'entryPoint',
    suggestOnly: true,
    message: chalk.red('Where is your entry point?'),
    source: cliFileMethods.searchFiles,
    validate(answer) {
      if (!fileDir.includes(answer)) {
        return 'Invalid entry point';
      }
      return true;
    },
  },
  {
    type: 'checkbox',  //creates a list of items that can be toggled on or off
    message: 'What features would you like to add to your project? (select multiple)',
    name: 'features',
    message: 'What features would you like added to your project?',
    choices: [
      new inquirer.Separator('Toggle features on or off (stretch stuff)'),
      {
        name: 'Add service worker children',
      },
      {
        name: 'Add indexDb caching',
      },
      {
        name: 'Code splitting with React Router',
      },
    ],
    validate(answer) {
      // checking to see if the user selected a drop down menu
      if (answer.length === 0) {
        return 'You must make a selection';
      }
      return true;
    },
  },
  {
    type: 'list',  //creates a selectable list of answers that is selectable with the arrow keys
    message: 'What functionality would you like to add to your project? (select one)',
    name: 'mainFunctionalitySelector',
    choices: [
      {
        name: 'Server-side rendering only',
      },
      {
        name: 'Service worker caching for offline functionality',
      },
      {
        name: 'Server-side rendering with service worker caching for offline functionality',
      },
    ],
  },
  {
    type: 'list',
    message: chalk.red('Would you like to save the test file?'),
    name: 'testFileSave',
    choices: [
      {
        name: 'YES',
      },
      {
        name: 'NO',
      },
    ],
  },
];

module.exports = cliQuestions;