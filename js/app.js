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

  angular.module('reClone', ['sky'])
    .factory('session', sessionFactory);
})();
