var onNow_IsChecked, temporary_IsChecked, finished_IsChecked;

var resetCheckBoxes = function() {
    this.find('#onNow').checked = false; 
    this.find('#temporary').checked = false; 
    this.find('#finished').checked = false; 
};


var setCheckBox = function(state) {
    template.find('#onNow').checked = false;
    template.find('#temporary').checked = false;
    template.find('#finished').checked = false;

    if (state == "onNow") {
        template.find('#onNow').checked = true;
    } else if (state == "temporary") {
        template.find('#temporary').checked = true;
    } else {
        template.find('#finished').checked = true;
    }

};


Template.postButtons.helpers({


});


Template.postButtons.created = function(){
   Session.set('checkBoxState');
};


Template.postButtons.events({
    // 'click .categoryButtons': function(e, template){
    'click .checkBoxes' : function(e, template){
        e.preventDefault();

        // check wath btn(check box) clicked
        var whatBtn = $(e.target).attr("name");
        console.log("checkBoxes clicked : " + whatBtn);

        // var onNowVal = this.find('#onNow').checked;
        // var tempVal = this.find('#temporary').checked;
        // var finVal = this.find('#finished').checked;

        // if (whatBtn == "onNow"){ 
        //     if (Session.get('checkBoxState').onNow)
        // }

        /* !! Session.get('checkBoxState').whatBtn is not working !!
           !! below style is only working !! */
        console.log(Session.get('checkBoxState')[whatBtn]);

        if (Session.get('checkBoxState')[whatBtn] == false) {
            console.log("checkbox select changes to " + whatBtn);

            var t = {'onNow': false, 'temporary': false, 'finished': false};
            Session.set('checkBoxState', t);

            // Session.set('checkBoxState', {'onNow': false, 'temporary': false, 'finished': false});
            template.find('#onNow').checked = false;
            template.find('#temporary').checked = false;
            template.find('#finished').checked = false;

            t[whatBtn] = true;
            Session.set('checkBoxState', t);
            console.log(Session.get('checkBoxState'));

            if (whatBtn == 'onNow') {
                template.find('#onNow').checked = true;
                console.log("whatBtn is onNow");
            } else if (whatBtn == 'temporary') {
                template.find('#temporary').checked = true;
                console.log("whatBtn is temporary");
            } else {
                template.find('#finished').checked = true;
                console.log("whatBtn is finished");
            }

            // template.find('#onNow').checked = true;


      }

        // // will set these value
        // var setVal = {
        //     onNow: false,
        //     temporary: false,
        //     finished: false
        // };

        // setVal.onNow = !onNow_IsChecked;
        // setVal.temporary = !temporary_IsChecked;
        // setVal.finished = !finished_IsChecked;

        // Meteor.call('updatePostState', this._id, newState,
        //     function(error, result){ //callback of Meteor.call()
        //         if (result) {
        //           if (whatBtn == "onNow"){
        //             // console.log("onNow callback");
        //             onNow_IsChecked = template.find('#onNow').checked = setVal[whatBtn];
        //             // onNow_IsChecked = template.find('#onNow').checked = !onNow_IsChecked;
        //             temporary_IsChecked = template.find('#temporary').checked = false;
        //             finished_IsChecked = template.find('#finished').checked = false;
        //           } else if (whatBtn == "temporary") {
        //             // console.log("temporary callback");
        //             onNow_IsChecked = template.find('#onNow').checked = false;
        //             temporary_IsChecked = template.find('#temporary').checked = setVal[whatBtn];
        //             // temporary_IsChecked = template.find('#temporary').checked = !temporary_IsChecked;
        //             finished_IsChecked = template.find('#finished').checked = false;
        //           } else if (whatBtn == "finished") {
        //             // console.log("finished callback");
        //             onNow_IsChecked = template.find('#onNow').checked = false;
        //             temporary_IsChecked = template.find('#temporary').checked = false;
        //             finished_IsChecked = template.find('#finished').checked = setVal[whatBtn];
        //             // finished_IsChecked = template.find('#finished').checked = !finished_IsChecked;
        //           }
        //         }
        //       });

        // console.log(btnVal + " button click!");

    }



});

Template.postButtons.rendered = function(){
    console.log("post.state: " + this.data.state);

    /* 
    POST_STATE_CUR = 2;
    POST_STATE_TEMP = 1;
    POST_STATE_FIN = 0;
    */

    resetCheckBoxes();

    var state = this.data.state;
    if (state == POST_STATE_CUR) {
        this.find('#onNow').checked = true; 
    } else if (state == POST_STATE_TEMP) {
        this.find('#temporary').checked = true; 
    } else {
        this.find('#finished').checked = true; 
    }

    var onNowVal = this.find('#onNow').checked;
    var tempVal = this.find('#temporary').checked;
    var finVal = this.find('#finished').checked;

    Session.set('checkBoxState', {'onNow': onNowVal, 'temporary': tempVal, 'finished': finVal});
    console.log("checkBoxState set!");

};


