var pageRendered = false;

Template.header.created = function() {
    pageRendered = false
};


Template.header.helpers({
    getPlaybarNotice: function() {
        // console.log("getPlaybarNotice()");
        var postOnNow = Posts.find({isOnNow: true}).count(); //reactive
        var postUpNext = Posts.find({isUpNext: true}).count(); //reactive

        if (postOnNow){
            // console.log("isOnNow");
            var post = Posts.findOne({isOnNow: true});
            // console.log(post.notice);
            return post.notice;
        };
        if (postUpNext){
            // console.log("isUpNext");
            var post = Posts.findOne({isUpNext: true});
            // console.log(post.notice);
            return post.notice;
        };
    },
    getStreamSrc: function() {
        var data = StreamURL.find({}); //reactive
        var dataExist = data.count();
        // console.log(dataExist);
        if (dataExist) {
            var url = data.fetch()[0].streamURL.url;
            // console.log(url);
            var src = document.getElementById('audioSource');
            src.src = url;

            // preload
            audio.load();
            document.getElementById('audio').paused = true;
            // document.getElementById('audio').muted = false;
        }
    },
    getOnNowExist: function() {
        var ison = Posts.find({isOnNow: true}).count(); //reactive
        // console.log(ison);
        return ison;
    },
    activeRouteClass: function(/* route names */) {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();
    
        var active = _.any(args, function(name) {
            return Router.current() && Router.current().route.getName() === name
    });
    
        return active && 'active';
    },
    autoPlay: function() {
        // console.log(Session.get('streamReady'));
        if (pageRendered){
            var audio = document.getElementById('audio');
            var strRdy = Session.get('streamReady');
            if (strRdy == true) {
                // console.log("play");
                audio.load();
                audio.oncanplay = function(){
                    audio.play();
                }
            }
        }
    },
    getStreamReady: function() {
        return Session.get('streamReady');
    }
});

Template.header.events({
    'click .playbutton': function(e) {
        // console.log("playbutton click");
        var audio = document.getElementById('audio');

        if (audio.paused) audio.play();

    },
    'click .pausebutton': function(e) {
        // console.log("pausebutton click");
        var audio = document.getElementById('audio');

        if (!audio.paused) audio.pause();
    }

  
});




Template.header.rendered = function() {

    pageRendered = true;

    // $('#control_1').on('input change', function(){
    //      // console.log(this.value);
    //     var audio = document.getElementById('audio');
    //     audio.volume = this.value;
    // });

    // $('#control_2').on('input change', function(){
    //      // console.log(this.value);
    //     var audio = document.getElementById('audio2');
    //     audio.volume = this.value;
    // });

};



















