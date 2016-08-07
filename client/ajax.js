var atob = function ( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}




var toBuffer = function (ab) {
    var buf = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}


Template.ajax.events({

  /*  
  'submit form': function(e) {
    e.preventDefault();

    console.log("submit!");

    // var url = "http://jjwc.cafe24.com/host_Uploads";
    var file = document.getElementById('fileItem').files[0];
    console.log(file);
    if (!file) return;

    var _name = file.name;
    var _size = file.size;
    var _type = file.type;

    var reader = new FileReader(); //create a reader according to HTML5 File API

    reader.onload = function(event){
      var arybuffer = new Uint8Array(reader.result) // convert to binary
      var buffer = atob(arybuffer);
      // var buffer = arybuffer;

      var imageFile  = {
        metadata: {
            name: _name,
            date: Date.now,
            size: _size,
            type: "image"
        },
        path: _name,
        mime: _type,
        data: buffer
      };

      Meteor.call('saveFile', imageFile, function(error, result){
        if (!error){

            console.log("result: " +result);
        } else {
            console.log("error: " + error);
        }
    });
  }

    reader.readAsArrayBuffer(file); //read the file as arraybuffer
*/

 'submit form': function(e) {
    e.preventDefault();

    var file = document.getElementById('fileItem').files[0];
    console.log(file);
    if (!file) return;

    Meteor.call('uploadFile', file, function(error, result){
        if (!error){
            console.log("result");
            console.log(result);
        } else {
            console.log("error: " + error);
        }
    });    
  }









});


