(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('TournamentController', TournamentController);

    TournamentController.$inject = ['$scope', '$state', 'DataUtils', 'Tournament'];

    function TournamentController ($scope, $state, DataUtils, Tournament) {
        var vm = this;

        vm.tournaments = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Tournament.query(function(result) {
                vm.tournaments = result;
                vm.searchQuery = null;
            });
        }
    }
})();
