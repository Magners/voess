(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('UserExtController', UserExtController);

    UserExtController.$inject = ['$scope', '$state', 'UserExt'];

    function UserExtController ($scope, $state, UserExt) {
        var vm = this;

        vm.userExts = [];

        loadAll();

        function loadAll() {
            UserExt.query(function(result) {
                vm.userExts = result;
                vm.searchQuery = null;
            });
        }
    }
})();
