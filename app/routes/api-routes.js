var auth = require('../middlewares/auth-middleware'),//require auth middlware,
    book = require('../middlewares/book-middleware'), //require book middleware
    api = require('../controllers/api-controller');//require api controller

module.exports = function(app,express){

  //create express router
  var router = express.Router();

  //================ API ROUTES ===============================================

  // ===== ALL BOOKS =====
  router.get('/all-books', auth.ensureAuthenticated, api.getAllBooks);

  //==== USER BOOKS =====
  router.route('/user-books')
     //create book
    .post(auth.ensureAuthenticated, book.getBookCovers, api.addNewBook)
    //get user's books
    .get(auth.ensureAuthenticated, api.getUserBooks);


  //======= SPECIFIC USER BOOK =====
  router.route('/user-books/:book_id')
    //delete a book
    .delete(auth.ensureAuthenticated, api.deleteBook);


 //=== OTHER USERS' PROFILE PAGE ====
  router.route('/user/:user_id')
    //get the page info and selected book
    .get(auth.ensureAuthenticated, api.getOtherUsersBooks)
    //request a book swap
    .post(auth.ensureAuthenticated, book.pushBookRequest, api.requestBookSwap);


  // === USER INBOX ========
  router.route('/inbox')
    .get(auth.ensureAuthenticated, api.getUserInbox)
    .put(auth.ensureAuthenticated, api.setApproval);


  //==== USER ACCOUNT ======
  router.route('/account')
    //get account info
    .get(auth.ensureAuthenticated, api.getAccountInfo)
    //update account info
    .put(auth.ensureAuthenticated, api.updateAccountInfo)
    //delete account
    .delete(auth.ensureAuthenticated, api.deleteAccount);

  //return the express router
  return router;
};
