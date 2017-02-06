(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('CountryController', CountryController);

    CountryController.$inject = ['$scope', '$state', 'DataUtils', 'Country'];

    function CountryController ($scope, $state, DataUtils, Country) {
        var vm = this;

        vm.countries = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Country.query(function(result) {
                vm.countries = result;
                vm.searchQuery = null;
            });
        }
    }
})();
