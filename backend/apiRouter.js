// import
const express = require('express');
const usersCtrl = require('./groupomania-project-app/routes/usersCtrl');
const messagesCtrl = require('./groupomania-project-app/routes/messagesCtrl');
const likesCtrl = require('./groupomania-project-app/routes/likesCtrl');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const auth = require('./groupomania-project-app/utils/authi')
const multer = require('./groupomania-project-app/utils/multer-config')
const path = require("path");
const helmet = require("helmet");
//const rateLimit = require('express-rate-limit');
//const rateLimiter = rateLimit ({
 // windowMs: 5 * 60 * 1000,
  //max: 5,
  //message: "Trop de tentatives échouées, réessayez dans 5 minutes"
//});

app.use(helmet());

app.use(cors({origin:true}));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());


//Router
exports.router = (function() {
  const apiRouter = express.Router();

    //users routes
    apiRouter.route("/users/register/").post(usersCtrl.register);
    apiRouter.route("/users/login/").post(usersCtrl.login);
    apiRouter.route("/users/me/").get(usersCtrl.getUserProfile);
    apiRouter.route("/users/me/").put(usersCtrl.updateUserProfile);

    //Messages routes
    apiRouter.route("/messages/new/").post( multer, messagesCtrl.createMessage);
    apiRouter.route("/messages/").get( multer, messagesCtrl.listMessages);
    apiRouter.route("/messages/:id").put( multer, messagesCtrl.modifyPost);
    apiRouter.route("/messages/:id").delete(multer, messagesCtrl.deletePost);
   
    //likes
    apiRouter.route("/messages/:messageId/vote/like").post(likesCtrl.likePost);
    apiRouter.route("/messages/:messageId/vote/dislike").post(likesCtrl.dislikePost);

    //comments
    apiRouter.route("/:id/comment").post(messagesCtrl.createComment);
    apiRouter.route("/:id/comment").get(messagesCtrl.getAllComments);

    module.exports = apiRouter;
})();