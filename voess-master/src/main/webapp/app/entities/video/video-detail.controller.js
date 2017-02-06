(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('VideoDetailController', VideoDetailController);

    VideoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Video', 'Team', 'Tournament', 'Player'];

    function VideoDetailController($scope, $rootScope, $stateParams, previousState, entity, Video, Team, Tournament, Player) {
        var vm = this;

        vm.video = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('voessApp:videoUpdate', function(event, result) {
            vm.video = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
