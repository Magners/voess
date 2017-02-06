(function() {
    'use strict';

    angular
        .module('voessApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('user-liked-player', {
            parent: 'entity',
            url: '/user-liked-player',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'voessApp.userLikedPlayer.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-liked-player/user-liked-players.html',
                    controller: 'UserLikedPlayerController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userLikedPlayer');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('user-liked-player-detail', {
            parent: 'entity',
            url: '/user-liked-player/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'voessApp.userLikedPlayer.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-liked-player/user-liked-player-detail.html',
                    controller: 'UserLikedPlayerDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userLikedPlayer');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'UserLikedPlayer', function($stateParams, UserLikedPlayer) {
                    return UserLikedPlayer.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'user-liked-player',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('user-liked-player-detail.edit', {
            parent: 'user-liked-player-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-player/user-liked-player-dialog.html',
                    controller: 'UserLikedPlayerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserLikedPlayer', function(UserLikedPlayer) {
                            return UserLikedPlayer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-liked-player.new', {
            parent: 'user-liked-player',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-player/user-liked-player-dialog.html',
                    controller: 'UserLikedPlayerDialogController',
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
                    $state.go('user-liked-player', null, { reload: 'user-liked-player' });
                }, function() {
                    $state.go('user-liked-player');
                });
            }]
        })
        .state('user-liked-player.edit', {
            parent: 'user-liked-player',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-player/user-liked-player-dialog.html',
                    controller: 'UserLikedPlayerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserLikedPlayer', function(UserLikedPlayer) {
                            return UserLikedPlayer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-liked-player', null, { reload: 'user-liked-player' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-liked-player.delete', {
            parent: 'user-liked-player',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-player/user-liked-player-delete-dialog.html',
                    controller: 'UserLikedPlayerDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['UserLikedPlayer', function(UserLikedPlayer) {
                            return UserLikedPlayer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-liked-player', null, { reload: 'user-liked-player' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
