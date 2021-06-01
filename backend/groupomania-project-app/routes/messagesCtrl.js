const models = require("../models");
const asyncLib = require("async");
const jwtUtils = require("../utils/auth");
const db = require('../models/index');
const Post = db.post;
const User = db.user;
const fs = require("fs");
//const xss = require("xss");

//constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;
//routes
module.exports = {
  createMessage: function (req, res) {
    //getting auth header
    var headerAuth = req.headers["authorization"];
    var userId = jwtUtils.getUserId(headerAuth);

    //params
    const title = req.body.title;
    const content = req.body.content;
    

    if (title == null || content == null) {
      return res.status(400).json({ error: "bad request" });
    }

    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
      return res.status(400).json({ error: "invalid paramrewereters" });
    }

    asyncLib.waterfall(
      [
        function (done) {console.log("tt");
          models.User.findOne({
            where: { id: userId },
          })
            .then(function (userFound) {
              done(null, userFound);
            })
            .catch(function (err) {
              return res.status(500).json({ error: "unable to verfy user" });
            });
        },
        function (userFound, done) {console.log("tt22e");
          
          if (userFound) {
            models.Message.create({ 
              title: title,
              content: content,
              likes: 0,
              attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
               
              userId: userFound.id,
            }).then(function (newMessage) {
              done(newMessage);
            });
          } else {
            res.status(404).json({ error: "user nt found" });
          }
        },
      ],
      function (newMessage) {console.log("tt3");
        if (newMessage) {
          return res.status(201).json(newMessage);
        } else {
          return res.status(500).json({ error: "cannot post mesage" });
        }
      }
    );
  },
  listMessages: function (req, res, next) {
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var order = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Message.findAll({
      order: [order != null ? order.split(":") : ["title", "ASC"]],
      attributes: fields !== "*" && fields != null ? fields.split(",") : null,
      limit: !isNaN(limit) ? limit : 5,
      offset: !isNaN(offset) ? offset : null,
      include: [
        {
          model: models.User,
          attributes: ["username"],
        },
      ],
    })
      .then(function (messages) {
        if (messages) {
          res.status(200).json(messages);
        } else {
          res.status(404).json({ error: "no mesccsages found" });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({ error: "invalid fields" });
      });
  },

  modifyPost: function (req, res, next) {
    if (!req.body) {
      return res.status(400).send({
        message: "Votre message modifié ne peut pas être vide",
      });
    }

    const id = req.params.id;

    Post.modifyPost(id, req.body)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Impossible de modifier le post avec id=${id}`,
          });
        } else res.send({ message: "Post modifié avec succes ! " });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Erreur avec la modification ud post avec l'id" + id,
        });
      });
  },

  deletePost: (req, res, next) => {
    models.Message.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((post) => {
        if (post.attachment !== null) {
          const filename = post.attachment.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            models
              .Message.destroy({ where: { id: req.params.id } })
              .then(() => res.status(200).json({ message: "Post supprimé !" }))
              .catch((error) => res.status(400).json({ error }));
          });
        }
        models.Message.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) =>
        res.status(400).json({ message: "Post iouvable", error: error })
      );
  },
  createComment: (req, res, next) => {
  const comment = {
    content: req.body.content,
    userId: req.body.userId,
    Message_id: req.params.id,
  };
  console.log(req.body);
  //Enregistre le post dans la base de données
  Comment.create(comment)
    .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
    .catch(() =>
      res.status(400).json({ message: "erreur commentaire controller" })
    );
  },

  getAllComments: (req, res, next) => {
  Comment.findAll({
    where: {
      Message_id: req.params.id,
    },
  })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(400).json({ error: "Erreur  commentaire" }));
  },
};


