Settings = new Mongo.Collection('settings');

validateSlideInterval = function (interval) {
  var errorMessage = "";
  var re = new RegExp("\\D")

  if (re.test(interval)) {
    errorMessage = "숫자만 입력 가능합니다. Only Number is allowed.";
  } else {
    if (!interval) {
      errorMessage = "값을 입력해주세요.";
    } else if (interval < SLIDE_INTERVAL_MIN || interval > SLIDE_INTERVAL_MAX) {
      errorMessage = SLIDE_INTERVAL_MIN + " ~ " + SLIDE_INTERVAL_MAX + " 의 값만 입력 가능합니다."
    }
  }

  console.log(errorMessage);
  return errorMessage;
}




Meteor.methods({

  saveSettings: function(settings) {

    check(settings, {
      slideInterval: Number,
    });

    // ensure the user is logged in
    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, "You need to login");

    return Settings.upsert({}, {$set: settings});
  },
});
