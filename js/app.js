(function() {
  function RunBlock(bbHelpConfig) {
    bbHelpConfig.productId = 'REx';
    bbHelpConfig.url = '//p1helpui.renxt.blackbaud.com/helpwidget.js';
  }

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

  function constituentStoreFactory() {
    function getConstituent(id) {
      return {
        id: 1,
        name: "Bill Murray",
        image: "http://fillmurray.com/200/200"
      };
    }

    return {
      getConstituent: getConstituent
    };
  }

  function ConstituentController(constituentStore, constituentId) {
    this.constituent = constituentStore.getConstituent(constituentId);
  }
  ConstituentController.$inject = ['constituentStore', 'constituentId'];

  function EditConstituentModalController(bbModal) {
    this.open = function () {
      bbModal.open({
          controller: 'EditConstituentContentController as editConstituentVm',
          templateUrl: 'constituents/edit.html'
      });
    };
  }
  EditConstituentModalController.$inject = ['bbModal'];

  function EditConstituentContentController(constituentStore, constituentId) {
    this.constituent = constituentStore.getConstituent(constituentId);
  }
  EditConstituentContentController.$inject = ['constituentStore', 'constituentId'];

  angular.module('reClone', ['sky'])
    .value('constituentId', 1)
    .factory('session', sessionFactory)
    .factory('constituentStore', constituentStoreFactory)
    .controller('OmnibarController', OmnibarController)
    .controller('ConstituentController', ConstituentController)
    .controller('EditConstituentModalController', EditConstituentModalController)
    .controller('EditConstituentContentController', EditConstituentContentController)
    .run(RunBlock);
})();
