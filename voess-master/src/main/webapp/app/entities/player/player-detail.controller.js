(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('PlayerDetailController', PlayerDetailController);

    PlayerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Player', 'Country', 'Video'];

    function PlayerDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Player, Country, Video) {
        var vm = this;

        vm.player = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('voessApp:playerUpdate', function(event, result) {
            vm.player = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
