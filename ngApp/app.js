var myapp;
(function (myapp) {
    angular.module('myapp', ['ui.router', 'ngResource', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
            url: '/',
            templateUrl: '/ngApp/views/home.html',
            controller: myapp.Controllers.HomeController,
            controllerAs: 'vm',
            data: {
                requiresAuthentication: true
            }
        })
            .state('add', {
            url: '/add',
            templateUrl: '/ngApp/views/addBook.html',
            controller: myapp.Controllers.AddBookController,
            params: {
                booklist: null
            },
            controllerAs: 'vm',
            data: {
                requiresAuthentication: true
            }
        })
            .state('edit', {
            url: '/edit/:id/:booklist',
            templateUrl: '/ngApp/views/editBook.html',
            controller: myapp.Controllers.EditBookController,
            controllerAs: 'vm',
            data: {
                requiresAuthentication: true
            }
        })
            .state('details', {
            url: '/details/:id/:booklist',
            templateUrl: '/ngApp/views/bookDetails.html',
            controller: myapp.Controllers.BookDetailsController,
            controllerAs: 'vm',
            data: {
                requiresAuthentication: true
            }
        })
            .state('admin', {
            url: '/admin',
            templateUrl: '/ngApp/views/admin.html',
            controller: myapp.Controllers.AdminController,
            controllerAs: 'vm',
            data: {
                requiresAuthentication: true
            }
        })
            .state('login', {
            url: '/login',
            templateUrl: '/ngApp/views/login.html',
            controller: myapp.Controllers.LoginController,
            controllerAs: 'vm'
        })
            .state('notFound', {
            url: '/notFound',
            templateUrl: '/ngApp/views/notFound.html'
        });
        $urlRouterProvider.otherwise('/notFound');
        $locationProvider.html5Mode(true);
    });
    angular.module('myapp').run(function ($rootScope, $state, accountService) {
        $rootScope.$on('$stateChangeStart', function (e, to) {
            var regexp = new RegExp('^home|^admin');
            var test = regexp.test(to.name);
            console.log('to name is: ', to.name);
            console.log('to data is: ', to.data);
            console.log('In run');
            if (test && to.data.requiresAuthentication) {
                console.log('Found home target');
                if (!accountService.isLoggedIn()) {
                    console.log('Not logged in');
                    e.preventDefault();
                    $state.go('login');
                }
            }
        });
    });
})(myapp || (myapp = {}));
