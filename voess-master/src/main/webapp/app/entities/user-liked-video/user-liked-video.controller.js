(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('UserLikedVideoController', UserLikedVideoController);

    UserLikedVideoController.$inject = ['$scope', '$state', 'UserLikedVideo'];

    function UserLikedVideoController ($scope, $state, UserLikedVideo) {
        var vm = this;

        vm.userLikedVideos = [];

        loadAll();

        function loadAll() {
            UserLikedVideo.query(function(result) {
                vm.userLikedVideos = result;
                vm.searchQuery = null;
            });
        }
    }
})();
