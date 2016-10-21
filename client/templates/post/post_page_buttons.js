var onNow_IsChecked, temporary_IsChecked, finished_IsChecked;

Template.postButtons.created = function(){
    


};


Template.postButtons.events({
    // 'click .categoryButtons': function(e, template){
    'click .checkBoxes' : function(e, template){
        e.preventDefault();

        // check wath btn(check box) clicked
        var whatBtn = $(e.target).attr("name");

        // will set these value
        var setVal = {
            onNow: false,
            temporary: false,
            finished: false
        };

        setVal.onNow = !onNow_IsChecked;
        setVal.temporary = !temporary_IsChecked;
        setVal.finished = !finished_IsChecked;

        Meteor.call('updatePostStatus', this._id, whatBtn, setVal[whatBtn],
            function(error, result){ //callback of Meteor.call()
                if (result) {
                  if (whatBtn == "onNow"){
                    // console.log("onNow callback");
                    onNow_IsChecked = template.find('#onNow').checked = setVal[whatBtn];
                    // onNow_IsChecked = template.find('#onNow').checked = !onNow_IsChecked;
                    temporary_IsChecked = template.find('#temporary').checked = false;
                    finished_IsChecked = template.find('#finished').checked = false;
                  } else if (whatBtn == "temporary") {
                    // console.log("temporary callback");
                    onNow_IsChecked = template.find('#onNow').checked = false;
                    temporary_IsChecked = template.find('#temporary').checked = setVal[whatBtn];
                    // temporary_IsChecked = template.find('#temporary').checked = !temporary_IsChecked;
                    finished_IsChecked = template.find('#finished').checked = false;
                  } else if (whatBtn == "finished") {
                    // console.log("finished callback");
                    onNow_IsChecked = template.find('#onNow').checked = false;
                    temporary_IsChecked = template.find('#temporary').checked = false;
                    finished_IsChecked = template.find('#finished').checked = setVal[whatBtn];
                    // finished_IsChecked = template.find('#finished').checked = !finished_IsChecked;
                  }
                }
              });

        // console.log(btnVal + " button click!");

    }



});

Template.postButtons.rendered = function(){
    console.log("data: " + this.data.isOnNow);

    if (this.loading)
    onNow_IsChecked = this.find('#onNow').checked = this.data.isOnNow;
    // onNow_IsChecked = this.data.isOnNow;
    // console.log("onNow: " + onNow_IsChecked);
    // onNow_IsChecked = this.find('#onNow').checked;
    temporary_IsChecked = this.find('#temporary').checked = this.data.istemporary;
    // temporary_IsChecked = this.find('#temporary').checked;
    finished_IsChecked = this.find('#finished').checked = this.data.isfinished;
    // finished_IsChecked = this.find('#finished').checked;

};


