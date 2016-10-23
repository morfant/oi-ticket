var post_state = POST_STATE_TEMP;
var post_state_obj = {"onNow": POST_STATE_CUR, "temporary": POST_STATE_TEMP, "finished": POST_STATE_FIN};

var resetCheckBoxes = function() {
    this.find('#onNow').checked = false; 
    this.find('#temporary').checked = false; 
    this.find('#finished').checked = false; 
};


Template.postButtons.helpers({


});


Template.postButtons.created = function(){

};


Template.postButtons.events({
    'click .checkBoxes' : function(e, template){
        e.preventDefault();

        // check what btn(check box) clicked
        var whatBtn = $(e.target).attr("name");
        console.log("checkBoxes clicked : " + whatBtn);

        if (post_state != post_state_obj[whatBtn]) {
            // console.log("checkbox select changes to " + whatBtn);
            post_state = post_state_obj[whatBtn];
        };

        var newState = post_state;
        Meteor.call('updatePostState', this._id, Number(newState),
            function(error, result){ //callback of Meteor.call()
                if (result) {

                    template.find('#onNow').checked = false;
                    template.find('#temporary').checked = false;
                    template.find('#finished').checked = false;

                    if (post_state_obj[whatBtn] == POST_STATE_CUR) {
                        document.getElementById("onNow").checked = true;
                        console.log("whatBtn is onNow");
                    } else if (post_state_obj[whatBtn] == POST_STATE_TEMP) {
                        template.find('#temporary').checked = true;
                        console.log("whatBtn is temporary");
                    } else if (post_state_obj[whatBtn] == POST_STATE_FIN) {
                        template.find('#finished').checked = true;
                        console.log("whatBtn is finished");
                    } else {
                        console.log("Something wrong@@");
                    }
                }
            }
        );
    },

});


Template.postButtons.rendered = function(){
    // console.log("post.state: " + this.data.state); // data is 'data context'

    /* POST_STATE_CUR = 2; POST_STATE_TEMP = 1; POST_STATE_FIN = 0; */

    resetCheckBoxes();
    post_state = this.data.state;

    if (post_state == POST_STATE_CUR) {
        this.find('#onNow').checked = true; 
    } else if (post_state == POST_STATE_TEMP) {
        this.find('#temporary').checked = true; 
    } else {
        this.find('#finished').checked = true; 
    }
};


