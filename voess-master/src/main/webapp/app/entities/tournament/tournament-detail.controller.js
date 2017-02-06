(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('TournamentDetailController', TournamentDetailController);

    TournamentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Tournament', 'Team', 'Video'];

    function TournamentDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Tournament, Team, Video) {
        var vm = this;

        vm.tournament = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('voessApp:tournamentUpdate', function(event, result) {
            vm.tournament = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
