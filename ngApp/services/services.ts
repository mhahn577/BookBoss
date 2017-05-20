namespace myapp.Services {

  class BookService {
    public BookResource;

    public saveBook(book) {
      this.BookResource.save(book);
    }

    public getBooks() {
      return this.BookResource.query();
    }

    public removeBook(id) {
      this.BookResource.delete({id: id});
    }

    constructor(public $resource) {
      this.BookResource = $resource('/api/books/:id');
    }
  }

  angular.module('myapp').service('bookService', BookService);


  class BooksReadService {
    public BooksReadResource;

    public saveBook(book) {
      this.BooksReadResource.save(book);
    }

    public getBooks() {
      return this.BooksReadResource.query();
    }

    public getBook(id) {
      return this.BooksReadResource.get({id: id});
    }

    public removeBook(id) {
      this.BooksReadResource.delete({id: id});
    }

    constructor(public $resource) {
      this.BooksReadResource = $resource('/api/booksread/:id');
    }
  }

  angular.module('myapp').service('booksreadService', BooksReadService);


  class BooksReadingService {
    public BooksReadingResource;

    public saveBook(book) {
      this.BooksReadingResource.save(book);
    }

    public getBooks() {
      return this.BooksReadingResource.query();
    }

    public getBook(id) {
      return this.BooksReadingResource.get({id: id});
    }

    public removeBook(id) {
      this.BooksReadingResource.delete({id: id});
    }

    constructor(public $resource) {
      this.BooksReadingResource = $resource('/api/booksreading/:id');
    }
  }

  angular.module('myapp').service('booksreadingService', BooksReadingService);


  class BooksToReadService {
    public BooksToReadResource;

    public saveBook(book) {
      this.BooksToReadResource.save(book);
    }

    public getBooks() {
      return this.BooksToReadResource.query();
    }

    public getBook(id) {
      return this.BooksToReadResource.get({id: id});
    }

    public removeBook(id) {
      this.BooksToReadResource.delete({id: id});
    }

    constructor(public $resource) {
      this.BooksToReadResource = $resource('/api/bookstoread/:id');
    }
  }

  angular.module('myapp').service('bookstoreadService', BooksToReadService);


  export class AccountService {
    public AccountResource;

    public tabInitialized = 0;
    public lastTab = 0;

    public saveReader(reader) {
      this.AccountResource.save(reader);
    }

    public getReaders() {
      return this.AccountResource.query();
    }

    public getReader(id) {
      return this.AccountResource.get({id: id});
    }

    public removeReader(id) {
      this.AccountResource.delete({id: id});
    }

    public isLoggedIn() {

      let status = sessionStorage.getItem("loggedIn");
      let regexp = new RegExp(status);
      let testpass = regexp.test("true");

      console.log('returning isLoggedIn of: ', status);

      if (testpass) {
        return true;
      }
      else {
        return false;
      }
    }

    constructor(public $resource) {
      this.AccountResource = $resource('/api/readers/:id');
    }

  }


   angular.module('myapp').service('accountService', AccountService);

   class AdminService {
     public AdminResource;

     public saveGenre(genre) {
       console.log('Genre is: ', genre);
       this.AdminResource.save(genre);
     }

     public getGenres() {
       return this.AdminResource.query();
     }

     public removeGenre(id) {
       this.AdminResource.delete({id: id});
     }

     constructor(public $resource) {
       this.AdminResource = $resource('/api/genres/:id');
     }
   }

   angular.module('myapp').service('adminService', AdminService);

   class GenreService {
     public GenreResource;
     public GenreBRResource;
     public GenreBGResource;
     public GenreBTResource;

     public getBooksbyGenre(genre, booklist) {

       let regexp = new RegExp('booksreading');
       let test = regexp.test(booklist);

       if (test) {
         return this.GenreBGResource.query({genre: genre});
       }

       else {
         regexp = new RegExp('booksread');
         test = regexp.test(booklist);
         if (test) {
           return this.GenreBRResource.query({genre: genre});
         }

         else {
           regexp = new RegExp('bookstoread');
           test = regexp.test(booklist);
           if (test) {
             return this.GenreBTResource.query({genre: genre});
           }
         }
       }
        // console.log('returning this: ', this.GenreResource.query({genre: genre}));
        // return this.GenreResource.query({genre: genre});
     }

     constructor(public $resource) {
       this.GenreResource = $resource('/api/genrebooks/:genre');
       this.GenreBRResource = $resource('/api/genrebooksread/:genre');
       this.GenreBGResource = $resource('/api/genrebooksreading/:genre');
       this.GenreBTResource = $resource('/api/genrebookstoread/:genre');
     }
   }

   angular.module('myapp').service('genreService', GenreService);
}
