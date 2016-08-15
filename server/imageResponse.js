fs = Meteor.npmRequire('fs');

WebApp.connectHandlers.use('/host_Uploads', function(req, res){

    // console.log("images on server");
    var pathLength = req.originalUrl.split('/').length;
    var fileName = req.originalUrl.split('/')[pathLength-1];
    // console.log("filename: " + fileName);
    var ext = fileName.split('.')[1];


    var canGetExts = [/^gif/i, /^jpe?g/i, /^png/i];    

    if (!_.any(canGetExts, function (re) {
            return re.test(ext);
        })) {
        throw new Meteor.Error( 500, '\'jpg\', \'jpeg\', \'png\' only acceptable.' );
    }

    // if (!_.contains(canGetExts, ext)) {
    //     throw new Meteor.Error( 500, '\'jpg\', \'jpeg\', \'png\' only acceptable.' );
    // }

    var file = fs.readFile(process.env.PWD + '/host_Uploads/' + fileName,
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
});

