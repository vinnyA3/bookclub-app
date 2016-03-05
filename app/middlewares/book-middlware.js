var User = require('../models/user'),
    Book = require('../models/book'),
    BookRequest = require('../models/book-requests'),
    google = require('googleapis'),
    googlebooks = google.books('v1');

// ================ GOOGLE BOOKS API MIDDLWWARE =============================
exports.getBookCovers = function(req,res,next){
    var reqbookTitle = req.body.title,
        //convert to lower case....strip spaces?
        bookTitle = reqbookTitle;
        console.log(bookTitle);
    //call google books api
    googlebooks.volumes.list({
      q: bookTitle
    }, function(err,data){
      //if the volumeInfo object is undefined, set imagelink to placeholder image
      console.log(data);
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

  //===== MIDDLEWARE-  Remove deleted reference to book in books db ===========
  exports.removeBookReference = function(req,res,next){
     console.log(req.params.book_id);
     Book.remove({'_id': req.params.book_id}, function(err){
       if(err){
         console.log(err);
         next();
       }else{
          next();
       }
     })
  };
