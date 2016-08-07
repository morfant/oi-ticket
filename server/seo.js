var userAgentRegExps = [
    /^facebookexternalhit/i, /^linkedinbot/i, /^twitterbot/i, /^facebot/i];

WebApp.connectHandlers.use(function (req, res, next) {
    // if (/\?.*_escaped_fragment_=/.test(req.url) ||
    if (/_escaped_fragment_=/.test(req.url) ||        
        _.any(userAgentRegExps, function (re) {
            return re.test(req.headers['user-agent']);
        })) {
        if (/^\//.test(req.url)) {

            var onNowPost = Posts.findOne({isOnNow: true});
            var upNextPost = Posts.findOne({isUpNext: true});
            var lastEpPost = Posts.findOne({isLastEp: true});
            var isOnNowExist = !_.isEmpty(onNowPost);
            var isUpNextExist = !_.isEmpty(upNextPost);
            var isLastEpExist = !_.isEmpty(lastEpPost);

            SSR.compileTemplate("seo", Assets.getText('seo.html'));


            Template.seo.helpers({
                getDesc: function() {

                  if (isOnNowExist) {
                    return "OnNow - " + onNowPost.title;
                  } else if (isUpNextExist) {
                    return "UpNext - " + upNextPost.title;
                  } else if (isLastEpExist) {
                    return "Last Episodes - " + lastEpPost.title;
                  } else {
                    return "Artist run internet radio.";
                  }

                },
                lastEps: function() {
                    return Posts.find({isLastEp: true}, {sort: {submitted: -1}});
                },
                onNowExist: function() {
                    return isOnNowExist;
                },
                upNextExist: function() {
                    return isUpNextExist;
                },
                lastEpExist: function() {
                    return isLastEpExist;
                },
                onNowTitle: function() {
                    return onNowPost.title;
                },
                onNowText: function() {
                    return onNowPost.text;
                }, 
                upNextTitle: function() {
                    return upNextPost.title;
                },
                upNextText: function() {
                    return upNextPost.text;
                }
            });

            var data = {};
            if (isOnNowExist) data = _.extend(data, onNowPost);
            if (isUpNextExist) data = _.extend(data, upNextPost);
            if (isLastEpExist) data = _.extend(data, lastEpPost);

            res.end("<!DOCTYPE html>" + SSR.render("seo", data));
        }
    } else {
        next();
    }
});

