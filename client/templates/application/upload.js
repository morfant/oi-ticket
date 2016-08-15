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
          console.log(index);
          console.log(fileInfo);
          console.log(context);

        },
    }
  }  
});