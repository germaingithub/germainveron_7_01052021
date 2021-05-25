const models = require("../models");
const asyncLib = require("async");
const jwtUtils = require("../utils/auth");

//constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;
//routes
module.exports = {
  createMessage: function (req, res,) {
     
    //getting auth header
    var headerAuth = req.headers["authorization"];
    var userId = jwtUtils.getUserId(headerAuth);
    
    //params
    const title = req.body.title;
    const content = req.body.content;
  console.log(req.headers);
  
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
              return res.status(500).json({ error: "unable to verfy user" });
            });
        },
        function (userFound, done) {
          
          if (userFound) {
            models.Message.create({
              title: title,
              content: content,
              likes: 0,
              userId: userFound.id,
              
            }).then(function (newMessage) {
            
              done(newMessage);
            });
          } else {
            res.status(404).json({ error: "user nt found" });
          }
        },
      ],
      function (newMessage) {
        if (newMessage) {
          return res.status(201).json(newMessage);
        } else {
          return res.status(500).json({ error: "cannot post mesage" });
        }
      }
    );
  },
  listMessages: function (req, res,next) {
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
      limit: !isNaN(limit) ? limit : null,
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
      res
        .status(500)
        .send({
          message: "Erreur avec la modification ud post avec l'id" + id,
        });
    });
},

deletePost: (req, res, next) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      if (post.imageUrl !== null) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Post supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
      Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Post supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) =>
      res.status(400).json({ message: "Post iouvable", error: error })
    );
}
  
};


