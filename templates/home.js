import './home.style';
import Controller from './home.controller';
import template from './home.template';

export default {
  url: '/',
  template: template,
  controllerAs: 'home',
  controller: () => new Controller()
};
