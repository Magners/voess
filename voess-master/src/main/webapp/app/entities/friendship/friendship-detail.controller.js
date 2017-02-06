(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('FriendshipDetailController', FriendshipDetailController);

    FriendshipDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Friendship', 'User'];

    function FriendshipDetailController($scope, $rootScope, $stateParams, previousState, entity, Friendship, User) {
        var vm = this;

        vm.friendship = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('voessApp:friendshipUpdate', function(event, result) {
            vm.friendship = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
