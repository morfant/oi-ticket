var fs = require('fs');

var re_uploads = new RegExp("host_Uploads");
var re_uploads_submit = new RegExp("host_Uploads\/submitting");
// var imageFolders = [/host_Uploads/, /host_Uploads\/submitting/];
var imageFolders = [ re_uploads, re_uploads_submit ];

WebApp.connectHandlers.use(function (req, res, next) {
    // if (/\?.*_escaped_fragment_=/.test(req.url) ||
    if (_.any(imageFolders, function (re) {
        // console.log(re);
        return re.test(req.url);
    })) {

        // console.log("req.url: " + req.url);
        // console.log("req.originalUrl: " + req.originalUrl);

        // console.log("images on server");
        var pathLength = req.originalUrl.split('/').length;
        var fileName = req.originalUrl.split('/')[pathLength-1];
        // console.log("fileName: " + fileName);
        var ext = fileName.split('.')[1];


        var canGetExts = [/^gif/i, /^jpe?g/i, /^png/i];

        if (!_.any(canGetExts, function (re) {
                return re.test(ext);
            })) {
            throw new Meteor.Error( 500, '\'jpg\', \'jpeg\', \'png\' only acceptable.' );
        }

        var readPath = "";
        if (!forDeploy) {
          if (re_uploads_submit.test(req.url)) { readPath = process.env.PWD + UPLOAD_DIR_SUBMIT; }
          else if (re_uploads.test(req.url)) { readPath = process.env.PWD + UPLOAD_DIR; }
          else {console.log("No matching path");}
        } else {
          if (re_uploads_submit.test(req.url)) { readPath = UPLOAD_DIR_SUBMIT; }
          else if (re_uploads.test(req.url)) { readPath = UPLOAD_DIR; }
        }
        console.log("readPath: " + readPath + fileName);

        // var file = fs.readFile(process.env.PWD + readPath + fileName,
        var file = fs.readFile(readPath + fileName,
            function(error, data){
                if (error){
                    // console.log(error);
                    res.writeHeader(500);
                    res.end(error.toString());
                } else {
                    // console.log(data);
                    res.writeHeader(200, {
                        'Content-Type': 'image/' + ext,
                        'Content-Length': data.length
                    });
                    res.end(data); //end the respone
                }
            });
        } else {
            // console.log(req.url);
            next();
        }
});
