(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('UserLikedVideoDetailController', UserLikedVideoDetailController);

    UserLikedVideoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'UserLikedVideo', 'User', 'Video'];

    function UserLikedVideoDetailController($scope, $rootScope, $stateParams, previousState, entity, UserLikedVideo, User, Video) {
        var vm = this;

        vm.userLikedVideo = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('voessApp:userLikedVideoUpdate', function(event, result) {
            vm.userLikedVideo = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
