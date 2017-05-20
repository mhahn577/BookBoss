var myapp;
(function (myapp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(accountService, booksreadService, booksreadingService, bookstoreadService, genreService, adminService, $state) {
                this.accountService = accountService;
                this.booksreadService = booksreadService;
                this.booksreadingService = booksreadingService;
                this.bookstoreadService = bookstoreadService;
                this.genreService = genreService;
                this.adminService = adminService;
                this.$state = $state;
                this.message = 'Hello from the home page!';
                var tabcontent;
                this.genres = adminService.getGenres();
                if (accountService.tabInitialized == 0) {
                    this.initialTabcontent = document.getElementsByClassName("tabcontent");
                    for (this.index = 1; this.index < this.initialTabcontent.length; this.index++) {
                        this.initialTabcontent[this.index].style.display = "none";
                    }
                    accountService.tabInitialized = 1;
                }
                else {
                    this.initialTabcontent = document.getElementsByClassName("tabcontent");
                    for (this.index = 0; this.index < this.initialTabcontent.length; this.index++) {
                        this.initialTabcontent[this.index].style.display = "none";
                    }
                    this.initialTabcontent[accountService.lastTab].style.display = "block";
                }
                this.booksread = booksreadService.getBooks();
                this.booksreading = booksreadingService.getBooks();
                this.bookstoread = bookstoreadService.getBooks();
            }
            HomeController.prototype.deleteBookRead = function (id) {
                this.booksreadService.removeBook(id);
                this.booksread = this.booksreadService.getBooks();
                this.accountService.lastTab = 0;
                this.$state.reload();
            };
            HomeController.prototype.deleteBookReading = function (id) {
                this.booksreadingService.removeBook(id);
                this.booksreading = this.booksreadingService.getBooks();
                this.accountService.lastTab = 1;
                this.$state.reload();
            };
            HomeController.prototype.deleteBookToRead = function (id) {
                this.bookstoreadService.removeBook(id);
                this.bookstoread = this.bookstoreadService.getBooks();
                this.accountService.lastTab = 2;
                this.$state.reload();
            };
            HomeController.prototype.openList = function (evt, listName) {
                var i;
                var tabcontent;
                var tablinks;
                this.selectedGenre = null;
                this.booksread = this.booksreadService.getBooks();
                this.booksreading = this.booksreadingService.getBooks();
                this.bookstoread = this.bookstoreadService.getBooks();
                this.genreBooksRead = [];
                this.genreBooksReading = [];
                this.genreBookstoRead = [];
                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablinks");
                for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" active", "");
                }
                document.getElementById(listName).style.display = "block";
                evt.currentTarget.className += " active";
            };
            HomeController.prototype.showBooksbyGenre = function (booklist) {
                console.log('you chose: ', this.selectedGenre, ' for: ', booklist);
                if (this.selectedGenre == null) {
                    return;
                }
                var regexp = new RegExp('booksreading');
                var test = regexp.test(booklist);
                if (test) {
                    this.genreBooksReading = this.genreService.getBooksbyGenre(this.selectedGenre, booklist);
                    this.accountService.lastTab = 1;
                }
                else {
                    regexp = new RegExp('booksread');
                    test = regexp.test(booklist);
                    if (test) {
                        this.genreBooksRead = this.genreService.getBooksbyGenre(this.selectedGenre, booklist);
                        this.accountService.lastTab = 0;
                    }
                    else {
                        regexp = new RegExp('bookstoread');
                        test = regexp.test(booklist);
                        if (test) {
                            this.genreBookstoRead = this.genreService.getBooksbyGenre(this.selectedGenre, booklist);
                            this.accountService.lastTab = 2;
                        }
                    }
                }
            };
            HomeController.prototype.logoutUser = function () {
                console.log('Logging out!');
                sessionStorage.removeItem("loggedIn");
                sessionStorage.removeItem("adminLoggedIn");
            };
            HomeController.prototype.gotoAdmin = function () {
                var status = sessionStorage.getItem("adminLoggedIn");
                var regexp = new RegExp(status);
                var testpass = regexp.test("true");
                console.log('returning adminLoggedIn of: ', status);
                if (testpass) {
                    this.$state.go('admin');
                }
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var AddBookController = (function () {
            function AddBookController($stateParams, accountService, booksreadService, booksreadingService, bookstoreadService, adminService) {
                this.$stateParams = $stateParams;
                this.accountService = accountService;
                this.booksreadService = booksreadService;
                this.booksreadingService = booksreadingService;
                this.bookstoreadService = bookstoreadService;
                this.adminService = adminService;
                this.message = 'Hello from the add page!';
                this.booklist = $stateParams['booklist'];
                this.genres = adminService.getGenres();
                this.regexp = new RegExp('booksreading');
                this.test = this.regexp.test(this.booklist);
                if (this.test) {
                    this.accountService.lastTab = 1;
                }
                else {
                    this.regexp = new RegExp('booksread');
                    this.test = this.regexp.test(this.booklist);
                    if (this.test) {
                        this.accountService.lastTab = 0;
                    }
                    else {
                        this.regexp = new RegExp('bookstoread');
                        this.test = this.regexp.test(this.booklist);
                        if (this.test) {
                            this.accountService.lastTab = 2;
                        }
                    }
                }
            }
            AddBookController.prototype.addBook = function () {
                console.log(this.booklist);
                var regexp = new RegExp('booksreading');
                var test = regexp.test(this.booklist);
                if (test) {
                    this.accountService.lastTab = 1;
                    this.booksreadingService.saveBook(this.book);
                }
                else {
                    regexp = new RegExp('booksread');
                    test = regexp.test(this.booklist);
                    if (test) {
                        this.accountService.lastTab = 0;
                        this.booksreadService.saveBook(this.book);
                    }
                    else {
                        regexp = new RegExp('bookstoread');
                        test = regexp.test(this.booklist);
                        if (test) {
                            this.accountService.lastTab = 2;
                            this.bookstoreadService.saveBook(this.book);
                        }
                    }
                }
            };
            return AddBookController;
        }());
        Controllers.AddBookController = AddBookController;
        var EditBookController = (function () {
            function EditBookController($stateParams, accountService, booksreadService, booksreadingService, bookstoreadService, adminService) {
                this.$stateParams = $stateParams;
                this.accountService = accountService;
                this.booksreadService = booksreadService;
                this.booksreadingService = booksreadingService;
                this.bookstoreadService = bookstoreadService;
                this.adminService = adminService;
                this.message = 'Hello from the edit page!';
                this.ratingNames = ["Excellent", "Good", "Okay", "Poor", "Terrible"];
                this.id = $stateParams['id'];
                this.booklist = $stateParams['booklist'];
                var regexp = new RegExp('booksreading');
                var test = regexp.test(this.booklist);
                this.genres = adminService.getGenres();
                if (test) {
                    this.book = this.booksreadingService.getBook(this.id);
                }
                else {
                    regexp = new RegExp('booksread');
                    test = regexp.test(this.booklist);
                    if (test) {
                        this.book = this.booksreadService.getBook(this.id);
                    }
                    else {
                        regexp = new RegExp('bookstoread');
                        test = regexp.test(this.booklist);
                        if (test) {
                            this.book = this.bookstoreadService.getBook(this.id);
                        }
                    }
                }
            }
            EditBookController.prototype.editBook = function () {
                console.log(this.booklist, this.id);
                this.book._id = this.id;
                var regexp = new RegExp('booksreading');
                var test = regexp.test(this.booklist);
                if (test) {
                    this.accountService.lastTab = 1;
                    this.booksreadingService.saveBook(this.book);
                }
                else {
                    regexp = new RegExp('booksread');
                    test = regexp.test(this.booklist);
                    if (test) {
                        this.accountService.lastTab = 0;
                        this.booksreadService.saveBook(this.book);
                    }
                    else {
                        regexp = new RegExp('bookstoread');
                        test = regexp.test(this.booklist);
                        if (test) {
                            this.accountService.lastTab = 2;
                            this.bookstoreadService.saveBook(this.book);
                        }
                    }
                }
            };
            return EditBookController;
        }());
        Controllers.EditBookController = EditBookController;
        var BookDetailsController = (function () {
            function BookDetailsController(accountService, $stateParams, booksreadService, booksreadingService, bookstoreadService) {
                this.accountService = accountService;
                this.$stateParams = $stateParams;
                this.booksreadService = booksreadService;
                this.booksreadingService = booksreadingService;
                this.bookstoreadService = bookstoreadService;
                this.message = 'Hello from the book details page!';
                this.id = $stateParams['id'];
                this.booklist = $stateParams['booklist'];
                var regexp = new RegExp('booksreading');
                var test = regexp.test(this.booklist);
                if (test) {
                    accountService.lastTab = 1;
                    this.book = this.booksreadingService.getBook(this.id);
                }
                else {
                    regexp = new RegExp('booksread');
                    test = regexp.test(this.booklist);
                    if (test) {
                        accountService.lastTab = 0;
                        this.book = this.booksreadService.getBook(this.id);
                    }
                    else {
                        regexp = new RegExp('bookstoread');
                        test = regexp.test(this.booklist);
                        if (test) {
                            accountService.lastTab = 2;
                            this.book = this.bookstoreadService.getBook(this.id);
                        }
                    }
                }
            }
            return BookDetailsController;
        }());
        Controllers.BookDetailsController = BookDetailsController;
        var LoginController = (function () {
            function LoginController(accountService, $state) {
                this.accountService = accountService;
                this.$state = $state;
                this.readers = accountService.getReaders();
            }
            LoginController.prototype.registerReader = function () {
                var userExists = false;
                console.log('checking users');
                var regexp = new RegExp(this.readerR.username);
                for (this.index = 0; this.index < this.readers.length; this.index++) {
                    var testuser = regexp.test(this.readers[this.index].username);
                    if (testuser) {
                        userExists = true;
                        alert('User name already exists. Pleast try another.');
                        this.index = this.readers.length;
                    }
                }
                if (!userExists) {
                    console.log('user does not exist');
                    regexp = new RegExp(this.readerR.password);
                    var testpass = regexp.test(this.password2);
                    if (testpass) {
                        this.accountService.saveReader(this.readerR);
                        alert('You have succesfully registered. Please log in.');
                        console.log('registered with credentials: ', this.readerR.username, this.readerR.password);
                        this.$state.reload();
                    }
                    else {
                        alert('Passwords do not match. Please try again.');
                    }
                }
            };
            LoginController.prototype.submitPassword = function () {
                var userExists = false;
                if (this.readerL == null) {
                    console.log('blank user');
                }
                else {
                    if ((this.readerL.username == null) || (this.readerL.username.length == 0)) {
                        console.log('blank username or password');
                    }
                    else {
                        var regexp = new RegExp(this.readerL.username);
                        for (this.index = 0; this.index < this.readers.length; this.index++) {
                            var testuser = regexp.test(this.readers[this.index].username);
                            if (testuser) {
                                console.log('login: found user');
                                userExists = true;
                                regexp = new RegExp(this.readerL.password);
                                var testpass = regexp.test(this.readers[this.index].password);
                                if (testpass) {
                                    sessionStorage.setItem("loggedIn", "true");
                                    regexp = new RegExp(this.readerL.username);
                                    var adminpass = regexp.test('admin');
                                    if (adminpass) {
                                        sessionStorage.setItem("adminLoggedIn", "true");
                                        this.$state.go('admin');
                                    }
                                    else {
                                        this.$state.go('home');
                                    }
                                }
                                else {
                                    alert('Invalid username or password. Please try again');
                                }
                                this.index = this.readers.length;
                            }
                        }
                    }
                }
                if (!userExists) {
                    alert('Invalid username or password. Please try again.');
                }
            };
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
        var AdminController = (function () {
            function AdminController($state, adminService) {
                this.$state = $state;
                this.adminService = adminService;
                this.message = 'Hello from the admin page!';
                this.genres = adminService.getGenres();
            }
            AdminController.prototype.addGenre = function () {
                this.adminService.saveGenre(this.genre);
                this.$state.reload();
                this.$state.reload();
            };
            AdminController.prototype.deleteGenre = function (id) {
                this.adminService.removeGenre(id);
                this.genres = this.adminService.getGenres();
                this.$state.reload();
            };
            return AdminController;
        }());
        Controllers.AdminController = AdminController;
    })(Controllers = myapp.Controllers || (myapp.Controllers = {}));
})(myapp || (myapp = {}));
