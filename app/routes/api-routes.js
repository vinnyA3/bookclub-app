var api = require('../controllers/api-controller'),   //require api Controller
    jwt = require('jwt-simple'),
    config = require('../../config/config'),
    moment = require('moment'),
    google = require('googleapis'),
    googlebooks = google.books('v1');

module.exports = function(app,express){
  //create express router
  var router = express.Router();

  // =============== AUTHENTICATION MIDDLEWARE ===============================
  function ensureAuthenticated(req,res,next){
    if(!req.headers.authorization){
      return res.status(401).send({message: 'Please make sure that your request has an Authorization header! Login or Signup.'});
    }
    var token = req.headers.authorization.split(' ')[1];

    var payload = null;
    try{
      payload = jwt.decode(token, config.secret);
    }
    catch(err){
      return res.status(401).send({message: err.message});
    }
    if (payload.exp <= moment().unix()){
      return res.status(401).send({message: 'Token has expired!'});
    }
    req.user = payload.sub;
    next();
  };

  // ================ GOOGLE BOOKS API MIDDLWWARE =============================
  function getBookCovers(req,res,next){
    var reqbookTitle = req.body.title,
        //convert to lower case....strip spaces?
        bookTitle = reqbookTitle.toLowerCase();
    //call google books api
    googlebooks.volumes.list({
      q: bookTitle
    }, function(err,data){
      //if the volumeInfo object is undefined, set imagelink to placeholder image
       if(data.items[0].volumeInfo.imageLinks === undefined){
         req.imgLink = 'http://2.bp.blogspot.com/-ioujBTQNnXU/UXNkQrx_wLI/AAAAAAAAEqk/URmUI7ZBbu4/s1600/noimage.gif';
         next();
       }else{
         //set the request 'imgLink' to first value's image link that is returned from the api call
         console.log('middlware: data returned image link = ' + data.items[0].volumeInfo.imageLinks.thumbnail);
         req.imgLink = data.items[0].volumeInfo.imageLinks.thumbnail;
         console.log('middleware: request img link = ' + req.imgLink);
         next();
       }
    });

  };

  //================ API ROUTES ===============================================

  // ===== ALL BOOKS =====
  router.get('/all-books', ensureAuthenticated, api.getAllBooks);

  //==== USER BOOKS =====
  router.route('/user-books')
     //create book
    .post(ensureAuthenticated, getBookCovers, api.addNewBook)
    //get user's books
    .get(ensureAuthenticated, api.getUserBooks);


  //======= SPECIFIC USER BOOK =====
  router.route('/user-books/:book_id')
    //delete a book
    .delete(ensureAuthenticated, api.deleteBook);


 //=== OTHER USERS' PROFILE PAGE ====
  router.route('/user/:user_id')
    //get the page info and selected book
    .get(ensureAuthenticated, api.getOtherUsersBooks)
    //request a book swap
    .post(ensureAuthenticated, api.requestBookSwap);


  // === USER INBOX ========
  router.route('/inbox')
    .get(ensureAuthenticated, api.getUserInbox);


  //==== USER ACCOUNT ======
  router.route('/account')
    //get account info
    .get(ensureAuthenticated, api.getAccountInfo)
    //update account info
    .put(ensureAuthenticated, api.updateAccountInfo)
    //delete account
    .delete(ensureAuthenticated, api.deleteAccount);


  //return the express router
  return router;
};
