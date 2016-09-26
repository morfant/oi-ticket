var uniqueID = "";

Template.uploadJquery.created = function(){
  // uniqueID = this.data.uniqueID;
  // console.log(uniqueID);
};

Template.uploadJquery.helpers({
  specificFormData: function() {
    return {
      id: this._id,
      other: this.other,
      hard: 'Lolcats'
      // imgID: uniqueID 
    }
  },
  myCallbacks: function() {
    return {
        // formData: function() { return { id: "232323", other: Session.get("ReactiveParam") } },
        finished: function(index, fileInfo, context) {
          // console.log(index);
          // console.log(fileInfo);
          // console.log(context);

          // var path = fileInfo.filepath;
          // console.log(path);

          // var exp = fileInfo.name.split('.')[1];
          // console.log(exp);
          
          // var file = path + fileInfo.name;
          // console.log(file);
          // var newName = path + "jsjntest" + "." + exp;

          // Meteor.call('renameImg', file, newName, function(error, result) {
          //   // display the error to the user and abort
          //   if (error)
          //     return throwError(error.reason);

          //   console.log("rename succeed");

          // });


        },
    }
  }  
});