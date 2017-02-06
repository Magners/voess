(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('UserLikedTeamsDeleteController',UserLikedTeamsDeleteController);

    UserLikedTeamsDeleteController.$inject = ['$uibModalInstance', 'entity', 'UserLikedTeams'];

    function UserLikedTeamsDeleteController($uibModalInstance, entity, UserLikedTeams) {
        var vm = this;

        vm.userLikedTeams = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            UserLikedTeams.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
