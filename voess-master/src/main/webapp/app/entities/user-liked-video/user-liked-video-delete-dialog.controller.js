(function() {
    'use strict';

    angular
        .module('voessApp')
        .controller('UserLikedVideoDeleteController',UserLikedVideoDeleteController);

    UserLikedVideoDeleteController.$inject = ['$uibModalInstance', 'entity', 'UserLikedVideo'];

    function UserLikedVideoDeleteController($uibModalInstance, entity, UserLikedVideo) {
        var vm = this;

        vm.userLikedVideo = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            UserLikedVideo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
