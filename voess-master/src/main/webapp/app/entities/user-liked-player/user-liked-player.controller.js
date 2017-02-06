(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('UserLikedPlayerController', UserLikedPlayerController);

    UserLikedPlayerController.$inject = ['$scope', '$state', 'UserLikedPlayer'];

    function UserLikedPlayerController ($scope, $state, UserLikedPlayer) {
        var vm = this;

        vm.userLikedPlayers = [];

        loadAll();

        function loadAll() {
            UserLikedPlayer.query(function(result) {
                vm.userLikedPlayers = result;
                vm.searchQuery = null;
            });
        }
    }
})();
