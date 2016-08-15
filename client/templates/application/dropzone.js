var uniqueID = "";

Template.dropZone.created = function(){
  // uniqueID = this.data.uniqueID;
  // console.log(uniqueID);
};

Template.dropZone.helpers({
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
          console.log(fileInfo);
          // console.log(context);



          var img = new Image(fileInfo.dimension.width, fileInfo.dimension.height);
          img.src = 'http://localhost:3000/host_Uploads/fullWidth/'+fileInfo.name;

          var btn = document.createElement("BUTTON");
          btn.setAttribute("class", "del");
          var t = document.createTextNode("delete");
          btn.appendChild(t);

          var a = document.createElement("a");
          a.setAttribute("class", "dellink");
          var linkText = document.createTextNode("delete");
          a.appendChild(linkText);

          var newDiv = document.createElement("div");
          newDiv.id = "grp";
          newDiv.appendChild(img);
          newDiv.appendChild(a);
          // newDiv.appendChild(btn);



          document.getElementById("img-preview").appendChild(newDiv);
          // document.getElementById("img-preview").appendChild(a);
          
        },
    }
  }
});


Template.dropZone.events({
  'click .dellink': function(e) {
    e.preventDefault();

    console.log("del link click");


    Meteor.call('deleteImg', filepath, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      console.log("delete succeed");

    });

  }

})