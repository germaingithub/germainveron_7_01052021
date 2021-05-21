// import
const express = require('express');
const usersCtrl = require('./groupomania-project-app/routes/usersCtrl');
const messagesCtrl = require('./groupomania-project-app/routes/messagesCtrl');
const likesCtrl = require('./groupomania-project-app/routes/likesCtrl');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const auth = require('./groupomania-project-app/utils/auth')
const multer = require('./groupomania-project-app/utils/multer-config')

app.use(cors({origin:true}));
app.use(bodyParser.json());
app.use(express.json());

//Router
exports.router = (function() {
  const apiRouter = express.Router();

    //users routes
    apiRouter.route('/users/register/' ).post(usersCtrl.register);
    apiRouter.route("/users/login/").post(usersCtrl.login);
    apiRouter.route("/users/me/").get(usersCtrl.getUserProfile);
    apiRouter.route("/users/me/").put(usersCtrl.updateUserProfile);

    //Messages routes
    apiRouter.route('/messages/new/').post(messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(messagesCtrl.listMessages);

    //likes
    apiRouter.route('/messages/:messageId/vote/like').post(likesCtrl.likePost);
    apiRouter.route('/messages/:messageId/vote/dislike').post(likesCtrl.dislikePost);

    module.exports = apiRouter;
})();