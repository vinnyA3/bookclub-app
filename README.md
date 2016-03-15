#Swap N' Go Book Club

Description: This is a Full-Stack JavaScript, book-swapping platform.  Create an account, post books that you are willing to swap, or make a request for a book.  


Link to app: https://stark-island-14379.herokuapp.com/ 

Want to install locally and play around?

* Install Node/NPM if you haven't already done so.
* Clone the Repo: `git clone https://github.com/vinnyA3/bookclub-app.git`
* Navigate into project directory and run NPM install: `cd bookclub_app && npm install` 
* In config/config.js, comment out the remote db and uncomment the local one (change db name as you see fit).  Also, add a secret string to be used in token authentication.
* Have fun!

Note: Webpack is used to compile the JS files, `so run: NODE_ENV=production webpack`  - this will minify the output file (scripts.min.js) and de-dupe all the unnecessary code.  


