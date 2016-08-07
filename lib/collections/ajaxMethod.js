Files = new Mongo.Collection('files');


Files.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Files.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

// let FilesSchema = new SimpleSchema({
//   'title': {
//     type: String,
//     label: 'The title of this event.'
//   },
//   'start': {
//     type: String,
//     label: 'When this event will start.'
//   },
//   'end': {
//     type: String,
//     label: 'When this event will end.'
//   },
//   'type': {
//     type: String,
//     label: 'What type of event is this?',
//     allowedValues: [ 'Live', 'Recorded' ]
//   },
//   'backgroundColor': {
//     type: String,
//     label: 'What color of event is this?'
//   }
// });

// Files.attachSchema( FilesSchema );

    // var xhr = new XMLHttpRequest(); 
    // xhr.open('POST', '/uploadSomeWhere', true);
    // xhr.onload = function(event){...}

    // xhr.send(file); 


var uploadFile = function(file, callback) {

  var url = "http://jjwc.cafe24.com/host_Uploads";

  try{
    var response = HTTP.post(url, {}).data;
    callback(null, response);

  }catch (error){
    if (error.response) {
      var errorCode = error.response.data.code;
      var errorMessage = error.response.data.message;
    // Otherwise use a generic error message
    } else {
      var errorCode = 500;
      var errorMessage = 'Cannot access the API';
    }
    // Create an Error object and return it via callback
    var myError = new Meteor.Error(errorCode, errorMessage);
    callback(myError, null);
  }

}

var up = function(file, callback){
  
  // req.open('GET', 'http://www.mozilla.org/', false);
  // req.send(null);
  // if(req.status == 200)
  //   dump(req.responseText);

  // var req = HTTP.get('http://www.mozilla.org/', {});

  var url = 'http://jjwc.cafe24.com/host_Uploads';
  try {
    var res = HTTP.call("POST", url, {
      data: file,
      headers : {
        'content-type': 'image/png',
        'content-length': data.length
      }
    });
    callback(null, res);

  } catch (error) {
    if (error.response) {
      var errorCode = error.response.data.code;
      var errorMessage = error.response.data.message;
    // Otherwise use a generic error message
    } else {
      console.log(error);
      var errorCode = 500;
      var errorMessage = 'Cannot access the API';
    }
    // Create an Error object and return it via callback
    var myError = new Meteor.Error(errorCode, errorMessage);
    callback(myError, null);    
  }
}


Meteor.methods({
  
  saveFile: function(image){
    Files.insert(image);
  },
  uploadFile: function (file) {
    console.log(file);
    if (Meteor.isServer) {
      this.unblock();
      var response = Meteor.wrapAsync(up)(file);
      return response;
    }
  }



});







