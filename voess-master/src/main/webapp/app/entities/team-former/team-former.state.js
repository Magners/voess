(function() {
    'use strict';

    angular
        .module('voessApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('team-former', {
            parent: 'entity',
            url: '/team-former',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'voessApp.teamFormer.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/team-former/team-formers.html',
                    controller: 'TeamFormerController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('teamFormer');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('team-former-detail', {
            parent: 'entity',
            url: '/team-former/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'voessApp.teamFormer.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/team-former/team-former-detail.html',
                    controller: 'TeamFormerDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('teamFormer');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TeamFormer', function($stateParams, TeamFormer) {
                    return TeamFormer.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'team-former',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('team-former-detail.edit', {
            parent: 'team-former-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/team-former/team-former-dialog.html',
                    controller: 'TeamFormerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TeamFormer', function(TeamFormer) {
                            return TeamFormer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('team-former.new', {
            parent: 'team-former',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/team-former/team-former-dialog.html',
                    controller: 'TeamFormerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                startDateTime: null,
                                finshDateTime: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('team-former', null, { reload: 'team-former' });
                }, function() {
                    $state.go('team-former');
                });
            }]
        })
        .state('team-former.edit', {
            parent: 'team-former',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/team-former/team-former-dialog.html',
                    controller: 'TeamFormerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TeamFormer', function(TeamFormer) {
                            return TeamFormer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('team-former', null, { reload: 'team-former' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('team-former.delete', {
            parent: 'team-former',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/team-former/team-former-delete-dialog.html',
                    controller: 'TeamFormerDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TeamFormer', function(TeamFormer) {
                            return TeamFormer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('team-former', null, { reload: 'team-former' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
