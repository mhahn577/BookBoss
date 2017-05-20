namespace myapp.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';
        // public books;
        public booksread;
        public booksreading;
        public bookstoread;
        public initialTabcontent;
        public index;
        public genres;
        public selectedGenre;
        public genreBooks;
        public genreBooksRead;
        public genreBooksReading;
        public genreBookstoRead;

        public deleteBookRead(id) {
          this.booksreadService.removeBook(id);
          this.booksread = this.booksreadService.getBooks();
          this.accountService.lastTab = 0;
          this.$state.reload();
        }

        public deleteBookReading(id) {
          this.booksreadingService.removeBook(id);
          this.booksreading = this.booksreadingService.getBooks();
          this.accountService.lastTab = 1;
          this.$state.reload();
        }

        public deleteBookToRead(id) {
          this.bookstoreadService.removeBook(id);
          this.bookstoread = this.bookstoreadService.getBooks();
          this.accountService.lastTab = 2;
          this.$state.reload();
        }

        public openList(evt, listName) {
          let i;
          let tabcontent;
          let tablinks;

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
        }

        public showBooksbyGenre(booklist) {
          console.log('you chose: ', this.selectedGenre, ' for: ', booklist);
          if (this.selectedGenre == null) {
            return;
          }

          let regexp = new RegExp('booksreading');
          let test = regexp.test(booklist);

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
          // this.genreBooks = this.genreService.getBooksbyGenre(this.selectedGenre, booklist);
        }

        public logoutUser() {
          console.log('Logging out!');
          sessionStorage.removeItem("loggedIn");
          sessionStorage.removeItem("adminLoggedIn");
        }

        public gotoAdmin() {

          let status = sessionStorage.getItem("adminLoggedIn");
          let regexp = new RegExp(status);
          let testpass = regexp.test("true");

          console.log('returning adminLoggedIn of: ', status);

          if (testpass) {
            this.$state.go('admin');
          }
        }

        constructor(public accountService, public booksreadService, public booksreadingService,
                     public bookstoreadService, public genreService, public adminService, public $state) {

          let tabcontent;
          this.genres = adminService.getGenres();

          // Start at index of 1 so first tab (at index 0) stays active, while all others go inactive.
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
    }

    export class AddBookController {
        public message = 'Hello from the add page!';
        public book;
        public booklist;
        public genres;
        public regexp;
        public test;

        public addBook() {
          console.log(this.booklist);

          let regexp = new RegExp('booksreading');
          let test = regexp.test(this.booklist);

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
        }

        constructor(public $stateParams, public accountService, public booksreadService, public booksreadingService, public bookstoreadService, public adminService) {
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
    }

    export class EditBookController {
        public message = 'Hello from the edit page!';
        public book;
        public id;
        public booklist;
        public genres;
        public index;
        public genreNames;
        public ratingNames = ["Excellent", "Good", "Okay", "Poor", "Terrible"];

        public editBook() {
          console.log(this.booklist, this.id);
          this.book._id = this.id;

          let regexp = new RegExp('booksreading');
          let test = regexp.test(this.booklist);

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
        }

        constructor(public $stateParams, public accountService, public booksreadService, public booksreadingService, public bookstoreadService, public adminService) {
          this.id = $stateParams['id'];
          this.booklist = $stateParams['booklist'];
          let regexp = new RegExp('booksreading');
          let test = regexp.test(this.booklist);

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
    }

    export class BookDetailsController {
        public message = 'Hello from the book details page!';
        public id;
        public book;
        public booklist;

        constructor(public accountService, public $stateParams, public booksreadService,  public booksreadingService, public bookstoreadService) {
          this.id = $stateParams['id'];
          this.booklist = $stateParams['booklist'];

          let regexp = new RegExp('booksreading');
          let test = regexp.test(this.booklist);

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
    }

    export class LoginController {

      public reader;
      public readerL;
      public readerR;
      public readers;
      public password2;
      public index;

      public registerReader() {
        let userExists = false;

        // check if reader userid already exists
        // if so then alert: userID already exists
        // if not then check that passwords match
        // if so, then enter user into database, tell them to log in
        // if not, alert: passwords don't match
        console.log('checking users');
        let regexp = new RegExp(this.readerR.username);

        for (this.index = 0; this.index < this.readers.length; this.index++) {
          let testuser = regexp.test(this.readers[this.index].username);

          if (testuser) {
            userExists = true;
            alert('User name already exists. Pleast try another.');
            this.index = this.readers.length;
          }
        }

        if (!userExists) {
          console.log('user does not exist');
          regexp = new RegExp(this.readerR.password);
          let testpass = regexp.test(this.password2);

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
      }

      public submitPassword() {

        let userExists = false;
        if (this.readerL == null) {
          console.log('blank user');
        }
        else {
          if ((this.readerL.username == null) || (this.readerL.username.length == 0)) {
            console.log('blank username or password');
          }
          else {
            let regexp = new RegExp(this.readerL.username);

            for (this.index = 0; this.index < this.readers.length; this.index++) {
              let testuser = regexp.test(this.readers[this.index].username);

              if (testuser) {
                console.log('login: found user');
                userExists = true;
                regexp = new RegExp(this.readerL.password);
                let testpass = regexp.test(this.readers[this.index].password);

                if (testpass) {
                  sessionStorage.setItem("loggedIn", "true");
                  regexp = new RegExp(this.readerL.username);
                  let adminpass = regexp.test('admin');
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
      }

      constructor(public accountService, private $state) {
        this.readers = accountService.getReaders();
      }
    }

    export class AdminController {
      public message = 'Hello from the admin page!';
      public genre;
      public genres;

      public addGenre() {
        this.adminService.saveGenre(this.genre);
        this.$state.reload();
        this.$state.reload();
      }

      public deleteGenre(id) {
        this.adminService.removeGenre(id);
        this.genres = this.adminService.getGenres();
        this.$state.reload();
      }

      constructor(private $state, public adminService) {
        this.genres = adminService.getGenres();
      }
    }

}
