var uuid = require('node-uuid');
function MulterImpl(config) {
    var defaultDest = './uploads/';

    this.init = function () {
        var multer = require('multer');

        var options = {
            storage: multer.diskStorage({
              destination : function(req, file, cb) {
                console.log(file.mimetype);
                var uploadDir = file.mimetype.substring(0, 5) == 'image' ?  './assets/uploads/avatars/' : defaultDest;
                cb(null, uploadDir) 
              },
              filename : function(req, file, cb){
                cb(null, uuid.v4()+file.originalname.substring(file.originalname.lastIndexOf('.'))) 
              }
            }),
            rename: function (fieldname, filename) {
                return filename + Date.now();
            },
            onFileUploadStart: function (file) {
                console.log(file.originalname + ' is starting ...');
            },
            onFileUploadComplete: function (file) {
                console.log(file.fieldname + ' uploaded to  ' + file.path);
            },
             fileFilter : function(req, file, cb){
               //TODO: EXTEND
               return cb(null, true);
             }
        };

        return multer(options);
    }
}

module.exports = MulterImpl;
