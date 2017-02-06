(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('PlayerController', PlayerController);

    PlayerController.$inject = ['$scope', '$state', 'DataUtils', 'Player'];

    function PlayerController ($scope, $state, DataUtils, Player) {
        var vm = this;

        vm.players = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Player.query(function(result) {
                vm.players = result;
                vm.searchQuery = null;
            });
        }
    }
})();
