(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('UserLikedTeamsController', UserLikedTeamsController);

    UserLikedTeamsController.$inject = ['$scope', '$state', 'UserLikedTeams'];

    function UserLikedTeamsController ($scope, $state, UserLikedTeams) {
        var vm = this;

        vm.userLikedTeams = [];

        loadAll();

        function loadAll() {
            UserLikedTeams.query(function(result) {
                vm.userLikedTeams = result;
                vm.searchQuery = null;
            });
        }
    }
})();
