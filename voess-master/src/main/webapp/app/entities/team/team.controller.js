(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('TeamController', TeamController);

    TeamController.$inject = ['$scope', '$state', 'DataUtils', 'Team'];

    function TeamController ($scope, $state, DataUtils, Team) {
        var vm = this;

        vm.teams = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Team.query(function(result) {
                vm.teams = result;
                vm.searchQuery = null;
            });
        }
    }
})();
