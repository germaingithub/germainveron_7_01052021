var bcrypt = require("bcrypt");
var jwtUtils = require("../utils/auth");
var models = require("../models");
var asyncLib = require("async");
const jwt = require('jsonwebtoken');

const maskData = require('maskdata');
const db = require('../models/index');
const User = db.user;
// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

// Routes
module.exports = {
  register: function(req, res) {
    // Params
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var bio = req.body.bio;

    if (email == null || username == null || password == null) {
      return res.status(400).json({ error: "missing parameters" });
    }

    if (username.length >= 13 || username.length <= 4) {
      return res
        .status(400)
        .json({ error: "wrong username (must be length 5 - 12)" });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "email is not valid" });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res
        .status(400)
        .json({
          error:
            "password invalid (must length 4 - 8 and include 1 number at least)",
        });
    }

    asyncLib.waterfall(
      [
        function(done) {
          models.User.findOne({
            attributes: ["email"],
            where: { email: email },
          })
            .then(function(userFound) {
              done(null, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        function(userFound, done) {
          if (!userFound) {
            bcrypt.hash(password, 5, function(err, bcryptedPassword) {
              done(null, userFound, bcryptedPassword);
            });
          } else {
            return res.status(409).json({ error: "user already exist" });
          }
        },
        function(userFound, bcryptedPassword, done) {
          var newUser = models.User.create({
            email: email,
            username: username,
            password: bcryptedPassword,
            bio: bio,
            isAdmin: 0,
          })
            .then(function(newUser) {
              done(newUser);
            })
            .catch(function(err) {
              return res.status(500).json({ error: "cannot add user" });
            });
        },
      ],
      function(newUser) {
        if (newUser) {
          return res.status(201).json({
            'userId': newUser.id,
          });
        } else {
          return res.status(500).json({ error: "cannot add user" });
        }
      }
    );
  },
  login: function (req, res, next) {
  User.findOne({login:req.body.email})
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect!" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
  },
  findByPk: function (req, res){
      User.findByPk(req.params.id).then((user) => {
        res.status(200).json({
          status: true,
          data: user,
        });
      });
    },
  getUserProfile: function(req, res) {
    // Getting auth header
    var headerAuth = req.headers["authorization"];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) return res.status(400).json({ error: "wrong token" });

    models.User.findOne({
      attributes: ["id", "email", "username", "bio"],
      where: { id: userId },
    })
      .then(function(user) {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(404).json({ error: "user not found" });
        }
      })
      .catch(function(err) {
        res.status(500).json({ error: "cannot fetch user" });
      });
  },
  updateUserProfile: function(req, res) {
    // Getting auth header
    var headerAuth = req.headers["authorization"];
    var userId = jwtUtils.getUserId(headerAuth);

    // Params
    var bio = req.body.bio;

    asyncLib.waterfall(
      [
        function(done) {
          models.User.findOne({
            attributes: ["id", "bio"],
            where: { id: userId },
          })
            .then(function(userFound) {
              done(null, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        function(userFound, done) {
          if (userFound) {
            userFound.update({
                bio: (bio ? bio : userFound.bio),
              }).then(function() {
                done(userFound);
              }).catch(function(err) {
                res.status(500).json({ error: "cannot update user" });
              });
          } else {
            res.status(404).json({ error: "user not found" });
          }
        },
      ],
      function(userFound) {
        if (userFound) {
          return res.status(201).json(userFound);
        } else {
          return res.status(500).json({ error: "cannot update user profile" });
        }
      }
    );
  },
   deleteUser: function (req, res)  {
      const id = req.params.id;
      console.log(req.data);
      User.destroy({ 
        where : { id: id }
       })
       
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
          .catch((error) => { console.log(error);
            res.status(500).json({ error })});
        
     
    },
};
