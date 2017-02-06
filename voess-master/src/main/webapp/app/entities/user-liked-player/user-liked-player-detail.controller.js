(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('UserLikedPlayerDetailController', UserLikedPlayerDetailController);

    UserLikedPlayerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'UserLikedPlayer', 'User', 'Player'];

    function UserLikedPlayerDetailController($scope, $rootScope, $stateParams, previousState, entity, UserLikedPlayer, User, Player) {
        var vm = this;

        vm.userLikedPlayer = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('voessApp:userLikedPlayerUpdate', function(event, result) {
            vm.userLikedPlayer = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
