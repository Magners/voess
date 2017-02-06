(function() {
    'use strict';

    angular
        .module('voessApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('user-liked-video', {
            parent: 'entity',
            url: '/user-liked-video',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'voessApp.userLikedVideo.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-liked-video/user-liked-videos.html',
                    controller: 'UserLikedVideoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userLikedVideo');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('user-liked-video-detail', {
            parent: 'entity',
            url: '/user-liked-video/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'voessApp.userLikedVideo.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-liked-video/user-liked-video-detail.html',
                    controller: 'UserLikedVideoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userLikedVideo');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'UserLikedVideo', function($stateParams, UserLikedVideo) {
                    return UserLikedVideo.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'user-liked-video',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('user-liked-video-detail.edit', {
            parent: 'user-liked-video-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-video/user-liked-video-dialog.html',
                    controller: 'UserLikedVideoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserLikedVideo', function(UserLikedVideo) {
                            return UserLikedVideo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-liked-video.new', {
            parent: 'user-liked-video',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-video/user-liked-video-dialog.html',
                    controller: 'UserLikedVideoDialogController',
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
                    $state.go('user-liked-video', null, { reload: 'user-liked-video' });
                }, function() {
                    $state.go('user-liked-video');
                });
            }]
        })
        .state('user-liked-video.edit', {
            parent: 'user-liked-video',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-video/user-liked-video-dialog.html',
                    controller: 'UserLikedVideoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserLikedVideo', function(UserLikedVideo) {
                            return UserLikedVideo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-liked-video', null, { reload: 'user-liked-video' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-liked-video.delete', {
            parent: 'user-liked-video',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-liked-video/user-liked-video-delete-dialog.html',
                    controller: 'UserLikedVideoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['UserLikedVideo', function(UserLikedVideo) {
                            return UserLikedVideo.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-liked-video', null, { reload: 'user-liked-video' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
