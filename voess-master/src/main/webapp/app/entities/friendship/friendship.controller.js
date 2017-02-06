(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('FriendshipController', FriendshipController);

    FriendshipController.$inject = ['$scope', '$state', 'Friendship'];

    function FriendshipController ($scope, $state, Friendship) {
        var vm = this;

        vm.friendships = [];

        loadAll();

        function loadAll() {
            Friendship.query(function(result) {
                vm.friendships = result;
                vm.searchQuery = null;
            });
        }
    }
})();
