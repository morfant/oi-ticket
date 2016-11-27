var fs = require('fs');


WebApp.connectHandlers.use('/delete', function(req, res){

    // console.log("images on server");
    var pathLength = req.originalUrl.split('/').length;
    // console.log(pathLength);

    var fileName = req.originalUrl.split('/')[pathLength-1];

    var dirName;
    if (pathLength > 3){
        var dirName = req.originalUrl.split('/')[pathLength-2];
    }

    // console.log("delete/"+ dirName + "/" + fileName);
    var ext = fileName.split('.')[1];


    var target = process.env.PWD + '/host_Uploads/' + dirName + "/" + fileName;
    fs.exists(target, function(exists) {
      if(exists) {

        // console.log(target + ' exists. Deleting now ...');

        fs.unlink(target, function(error){
            if (error) throw error;
            // console.log("successfully deleted " + target);
            res.writeHeader(200);
            res.end("successfully deleted " + target);
        });
      } else {
        res.writeHeader(500);
        res.end(target + ' not found, so not deleting.');
        // console.log(target + 'File not found, so not deleting.');
      }
    });

});
