const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils')

//constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;

//routes
module.exports ={
    createMessage: function (req, res) {
        //getting auth header
        var headerAuth = req.headers["authorization"];
        var userId = jwtUtils.getUserId(headerAuth);

        //params
        const title = req.body.title;
        const content = req.body.content;

        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'bad request'});
        }
        
        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
          return res.status(400).json({ error: "invalid parameters" });
        }
    },
    listMessages: function(req, res) {
        
    }
}