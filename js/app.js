(function() {
  function sessionFactory() {
    var authenticated = false;

    function authenticate() {
      authenticated = true;
      console.log('Authenticated');
    }

    function invalidate() {
      authenticated = false;
      console.log('Not Authenticated');
    }

    function isAuthenticated() {
      return authenticated;
    }

    return {
      authenticate: authenticate,
      invalidate: invalidate,
      isAuthenticated: isAuthenticated
    };
  }

  function OmnibarController(session) {
    this.authenticate = session.authenticate;
    this.invalidate = session.invalidate;
    this.isAuthenticated = session.isAuthenticated;
  }
  OmnibarController.$inject = ['session'];


  angular.module('reClone', ['sky'])
    .factory('session', sessionFactory)
    .controller('OmnibarController', OmnibarController)
})();
