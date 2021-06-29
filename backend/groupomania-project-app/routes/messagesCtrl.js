const models = require("../models");
const asyncLib = require("async");
const jwtUtils = require("../utils/auth");
const db = require('../models/index');
const Post = db.post;
const User = db.user;
const fs = require("fs");
const Comment = db.comments;
const xss = require("xss");

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
        function (done) {
          models.User.findOne({
            where: { id: userId },
          })
            .then(function (userFound) {
              done(null, userFound);
            })
            .catch(function (err) {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        function (userFound, done) {
          console.log("tt22");

          if (userFound) {
            console.log("tt23");
            console.log(userFound);
            models.Message.create({
              title: xss(title),
              content: xss(content),
              likes: 0,
              attachment: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,

              userId: userFound.id,
            }).then(function (newMessage) {
              console.log(newMessage);
              done(newMessage);
            });
          } else {
            console.log("tt23 not");
            res.status(404).json({ error: "user nt found" });
          }
        },
      ],
      function (newMessage) {
        console.log("tt3");
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
      order: [order != null ? order.split(":") : ["updatedAt", "DESC"]],
      attributes: fields !== "*" && fields != null ? fields.split(",") : null,
      limit: !isNaN(limit) ? limit : 5,
      offset: !isNaN(offset) ? offset : null,
      // include: [
      //   {
      //    model: models.User,
      //     attributes: ["username"],
      //   },
      // ],
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

  deletePost: function (req, res, next) {
    // Récupération de l'en-tête d'authorisation
    let headerAuth = req.headers["authorization"];

    // Verifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Récupération des paramètres
    let messageId = parseInt(req.params.id); console.log(req.params.id);

    asyncLib.waterfall(
      [
        // Récupérer l'utilisateur dans la base de données (correspondant au token)
        function (done) {
          User.findOne({
            where: { id: userId },
          })
            .then(function (userFound) {
              // Si l'utilisateur est trouvé, on continue (premier paramètre null)
              done(null, userFound);
            })
            .catch(function (err) {
              // Sinon, on retourne une erreur
              return res.status(500).json({ error: "unable to verify user" });
            });
        },

        function (userFound, done) {
          // Verifier si l'utilisateur dispose des droits admin
          User.findOne({
            attributes: ["isAdmin"],
            where: { isAdmin: userFound.isAdmin },
          })
            .then(function (userFound) { console.log(userFound);
              if (userFound.isAdmin == true || userFound.isAdmin == false) {
                done(null);
              } else {
                return res
                  .status(403)
                  .json({ error: "you do not have sufficient privileges" });
              }
            })
            .catch(function (err) {
              return res.status(500).json({ err });
            });
        },

        function (done) {
          // Suppression des images uploadés (si presentes)
          Post.findOne({
            where: { id: messageId },
          })
            .then(function (message) {
              let filename = message.attachment.split("/images/")[1];
              if (filename != null) {
                fs.unlinkSync(`public/images/${filename}`);
              }
              done(null, message);
            })
            .catch(function (err) {
              return res
                .status(500)
                .json({ error: "unable to delete file! - " + err });
            });
        },
        function (messageId, done) {
          // S'il y a des Commentaires liée au messages, il seront supprimés.
          if (messageId) {
            Comment.destroy({
              where: { message_id: messageId.id },
            })
              .then(function () {
                done(null, messageId);
              })
              .catch(function (err) {
                return res
                  .status(500)
                  .json({ error: "unable to remove Comment in DB" + err });
              });
          } else {
            done(null);
          }
        },

        function (messageId, done) {
          // Récupérer l'id du message concerné
          if (messageId) {
            models.Message.destroy({
              where: { id: messageId.id },
            })
              .then(function (deleteMessage) {
                // Si tout c'est bien passé, un information de réussite est envoyée.
                done(deleteMessage);
              })
              .catch(function (err) {
                // En cas de problème, un message d'erreur est retourné.
                res
                  .status(500)
                  .json({ error: "unable to delete message in DB" });
              });
          } else {
            // En cas de problème, un message d'erreur est retourné.
            res.status(404).json({ error: "message not found" });
          }
        },
      ],
      function (deleteMessage) {
        if (deleteMessage) {
          // delete du message OK
          return res
            .status(201)
            .json({ message: "message deleted successfully" });
        } else {
          // Le message n'est pas présent.
          return res.status(500).json({ error: "message not found" });
        }
      }
    );
  },
  createComment: (req, res, next) => {
    const comment = {
      userId: req.body.userId,
      Message_id: req.params.id,
      content: req.body.content,
    };
    console.log(comment);
    //Enregistre le post dans la base de données
    Comment.create(comment)
      .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "erreur com' controller" });
      });
  },

  getAllComments: (req, res, next) => {
    Comment.findAll({
      where: {
        Message_id: req.params.id,
      },
      attributes: ["userId", "content"],
    })
      .then((comment) => res.status(200).json(comment))
      .catch((error) => {
        console.log(error);
        res.status(400).json({ error: "Erreur  commentaire" });
      });
  },

  deleteComments: function (req, res, next) {
    // Récupération de l'en-tête d'authorisation
    let headerAuth = req.headers["authorization"];

    // Verifier que ce token est valide pour faire une requête en BDD
    let userId = jwtUtils.getUserId(headerAuth);

    // Récupération des paramètres
    let message_id = parseInt(req.body.message_id);
    console.log(req.params);
    let commentId = Comment.findAll({
      where: {
        Message_id: req.params.id,
      },
      attributes: ["userId", "content"],
    });
    asyncLib.waterfall(
      [
        // Récupérer l'utilisateur dans la base de données (correspondant au token)
        function (done) {
          console.log(req.params);
          User.findOne({
            where: { id: userId },
          })
            .then(function (userFound) {
              // Si l'utilisateur est trouvé, on continue (premier paramètre null)
              done(null, userFound);
            })
            .catch(function (err) {
              // Sinon, on retourne une erreur
              return res.status(500).json({ error: "unable to verify user" });
            });
        },

        function (userFound, done) {
          console.log("debut");
          // Verifier si l'utilisateur dispose des droits admin
          models.User.findOne({
            attributes: ["isAdmin"],
            where: { isAdmin: userFound.isAdmin },
          })
            .then(function (userFound) {
              if (userFound.isAdmin == false) {
                done(null, commentId);
              } else {
                return res
                  .status(403)
                  .json({ error: "you do not have sufficient privileges" });
              }
            })
            .catch(function (err) {
              return res.status(500).json({ err });
            });
        },

        function (commentFound, done) {
          console.log("la");
          // Récupérer l'id du commentaire concerné
          if (commentFound) {
            Comment.destroy({
              where: {
                id: commentId,
                message_id,
              },
            })
              .then(function (deleteComment) {
                // Si tout c'est bien passé, un information de réussite est envoyée.
                done(deleteComment);
              })
              .catch(function (err) {
                // En cas de problème, un message d'erreur est retourné.
                res
                  .status(500)
                  .json({ error: "unable to delete comment in DB" + err });
              });
          } else {
            // En cas de problème, un message d'erreur est retourné.
            res.status(404).json({ error: "comment not found" });
          }
        },
      ],
      function (deleteComment) {
        console.log("ici");
        if (deleteComment) {
          // delete du message OK
          return res
            .status(201)
            .json({ message: "comment deleted successfully" });
        } else {
          // Le message n'est pas présent.
          return res.status(500).json({ error: "comment not found" });
        }
      }
    );
  },
};