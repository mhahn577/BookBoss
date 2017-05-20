var myapp;
(function (myapp) {
    var Services;
    (function (Services) {
        var BookService = (function () {
            function BookService($resource) {
                this.$resource = $resource;
                this.BookResource = $resource('/api/books/:id');
            }
            BookService.prototype.saveBook = function (book) {
                this.BookResource.save(book);
            };
            BookService.prototype.getBooks = function () {
                return this.BookResource.query();
            };
            BookService.prototype.removeBook = function (id) {
                this.BookResource.delete({ id: id });
            };
            return BookService;
        }());
        angular.module('myapp').service('bookService', BookService);
        var BooksReadService = (function () {
            function BooksReadService($resource) {
                this.$resource = $resource;
                this.BooksReadResource = $resource('/api/booksread/:id');
            }
            BooksReadService.prototype.saveBook = function (book) {
                this.BooksReadResource.save(book);
            };
            BooksReadService.prototype.getBooks = function () {
                return this.BooksReadResource.query();
            };
            BooksReadService.prototype.getBook = function (id) {
                return this.BooksReadResource.get({ id: id });
            };
            BooksReadService.prototype.removeBook = function (id) {
                this.BooksReadResource.delete({ id: id });
            };
            return BooksReadService;
        }());
        angular.module('myapp').service('booksreadService', BooksReadService);
        var BooksReadingService = (function () {
            function BooksReadingService($resource) {
                this.$resource = $resource;
                this.BooksReadingResource = $resource('/api/booksreading/:id');
            }
            BooksReadingService.prototype.saveBook = function (book) {
                this.BooksReadingResource.save(book);
            };
            BooksReadingService.prototype.getBooks = function () {
                return this.BooksReadingResource.query();
            };
            BooksReadingService.prototype.getBook = function (id) {
                return this.BooksReadingResource.get({ id: id });
            };
            BooksReadingService.prototype.removeBook = function (id) {
                this.BooksReadingResource.delete({ id: id });
            };
            return BooksReadingService;
        }());
        angular.module('myapp').service('booksreadingService', BooksReadingService);
        var BooksToReadService = (function () {
            function BooksToReadService($resource) {
                this.$resource = $resource;
                this.BooksToReadResource = $resource('/api/bookstoread/:id');
            }
            BooksToReadService.prototype.saveBook = function (book) {
                this.BooksToReadResource.save(book);
            };
            BooksToReadService.prototype.getBooks = function () {
                return this.BooksToReadResource.query();
            };
            BooksToReadService.prototype.getBook = function (id) {
                return this.BooksToReadResource.get({ id: id });
            };
            BooksToReadService.prototype.removeBook = function (id) {
                this.BooksToReadResource.delete({ id: id });
            };
            return BooksToReadService;
        }());
        angular.module('myapp').service('bookstoreadService', BooksToReadService);
        var AccountService = (function () {
            function AccountService($resource) {
                this.$resource = $resource;
                this.tabInitialized = 0;
                this.lastTab = 0;
                this.AccountResource = $resource('/api/readers/:id');
            }
            AccountService.prototype.saveReader = function (reader) {
                this.AccountResource.save(reader);
            };
            AccountService.prototype.getReaders = function () {
                return this.AccountResource.query();
            };
            AccountService.prototype.getReader = function (id) {
                return this.AccountResource.get({ id: id });
            };
            AccountService.prototype.removeReader = function (id) {
                this.AccountResource.delete({ id: id });
            };
            AccountService.prototype.isLoggedIn = function () {
                var status = sessionStorage.getItem("loggedIn");
                var regexp = new RegExp(status);
                var testpass = regexp.test("true");
                console.log('returning isLoggedIn of: ', status);
                if (testpass) {
                    return true;
                }
                else {
                    return false;
                }
            };
            return AccountService;
        }());
        Services.AccountService = AccountService;
        angular.module('myapp').service('accountService', AccountService);
        var AdminService = (function () {
            function AdminService($resource) {
                this.$resource = $resource;
                this.AdminResource = $resource('/api/genres/:id');
            }
            AdminService.prototype.saveGenre = function (genre) {
                console.log('Genre is: ', genre);
                this.AdminResource.save(genre);
            };
            AdminService.prototype.getGenres = function () {
                return this.AdminResource.query();
            };
            AdminService.prototype.removeGenre = function (id) {
                this.AdminResource.delete({ id: id });
            };
            return AdminService;
        }());
        angular.module('myapp').service('adminService', AdminService);
        var GenreService = (function () {
            function GenreService($resource) {
                this.$resource = $resource;
                this.GenreResource = $resource('/api/genrebooks/:genre');
                this.GenreBRResource = $resource('/api/genrebooksread/:genre');
                this.GenreBGResource = $resource('/api/genrebooksreading/:genre');
                this.GenreBTResource = $resource('/api/genrebookstoread/:genre');
            }
            GenreService.prototype.getBooksbyGenre = function (genre, booklist) {
                var regexp = new RegExp('booksreading');
                var test = regexp.test(booklist);
                if (test) {
                    return this.GenreBGResource.query({ genre: genre });
                }
                else {
                    regexp = new RegExp('booksread');
                    test = regexp.test(booklist);
                    if (test) {
                        return this.GenreBRResource.query({ genre: genre });
                    }
                    else {
                        regexp = new RegExp('bookstoread');
                        test = regexp.test(booklist);
                        if (test) {
                            return this.GenreBTResource.query({ genre: genre });
                        }
                    }
                }
            };
            return GenreService;
        }());
        angular.module('myapp').service('genreService', GenreService);
    })(Services = myapp.Services || (myapp.Services = {}));
})(myapp || (myapp = {}));
