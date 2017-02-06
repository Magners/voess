(function() {
    'use strict';

    angular
        .module('voessApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('user-liked-teams', {
            parent: 'entity',
            url: '/user-liked-teams',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'voessApp.userLikedTeams.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-liked-teams/user-liked-teams.html',
                    controller: 'UserLikedTeamsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userLikedTeams');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('user-liked-teams-detail', {
            parent: 'entity',
            url: '/user-liked-teams/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'voessApp.userLikedTeams.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-liked-teams/user-liked-teams-detail.html',
                    controller: 'UserLikedTeamsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userLikedTeams');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'UserLikedTeams', function($stateParams, UserLikedTeams) {
                    return UserLikedTeams.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'user-liked-teams',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('user-liked-teams-detail.edit', {
            parent: 'user-liked-teams-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-teams/user-liked-teams-dialog.html',
                    controller: 'UserLikedTeamsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserLikedTeams', function(UserLikedTeams) {
                            return UserLikedTeams.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-liked-teams.new', {
            parent: 'user-liked-teams',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-teams/user-liked-teams-dialog.html',
                    controller: 'UserLikedTeamsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                startDateTime: null,
                                userLiked: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('user-liked-teams', null, { reload: 'user-liked-teams' });
                }, function() {
                    $state.go('user-liked-teams');
                });
            }]
        })
        .state('user-liked-teams.edit', {
            parent: 'user-liked-teams',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-teams/user-liked-teams-dialog.html',
                    controller: 'UserLikedTeamsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserLikedTeams', function(UserLikedTeams) {
                            return UserLikedTeams.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-liked-teams', null, { reload: 'user-liked-teams' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-liked-teams.delete', {
            parent: 'user-liked-teams',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-teams/user-liked-teams-delete-dialog.html',
                    controller: 'UserLikedTeamsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['UserLikedTeams', function(UserLikedTeams) {
                            return UserLikedTeams.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-liked-teams', null, { reload: 'user-liked-teams' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
