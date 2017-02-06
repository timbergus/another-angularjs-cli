/**
 * This is the route controller.
 */

export default class Controller {

  /**
   * This is the constructor.
   * @param {Object} $scope   This is the directive scope
   * @param {Object} $ngRedux This is the redux element
   */

  constructor () {

    /**
     * This is the route content.
     * @type {String}
     */

    this.message = 'Hello World!';
  }
}
