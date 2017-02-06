(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('TeamFormerController', TeamFormerController);

    TeamFormerController.$inject = ['$scope', '$state', 'TeamFormer'];

    function TeamFormerController ($scope, $state, TeamFormer) {
        var vm = this;

        vm.teamFormers = [];

        loadAll();

        function loadAll() {
            TeamFormer.query(function(result) {
                vm.teamFormers = result;
                vm.searchQuery = null;
            });
        }
    }
})();
