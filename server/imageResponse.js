fs = Meteor.npmRequire('fs');

WebApp.connectHandlers.use('/images', function(req, res){

    // console.log("images on server");
    var fileName = req.originalUrl.split('/')[2];
    var ext = fileName.split('.')[1];

    var canGetExts = ['jpg', 'png', 'jpeg'];

    if (!_.contains(canGetExts, ext)) {
        throw new Meteor.Error( 500, '\'jpg\', \'jpeg\', \'png\' only acceptable.' );
    }

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

