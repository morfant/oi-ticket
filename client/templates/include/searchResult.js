Template.searchResult.created = function() {
};


Template.searchResult.rendered = function() {

};


Template.searchResult.helpers({

  deletable: function(state_int) {
    if (state_int == POST_STATE_CUR) {
      // console.log("deletable true");
      return true;
    } else {
      // console.log("deletable false");
      return false;
    }
  },

  convertConstant: function(state_int) {
    switch (state_int) {
      case 0:
        return "상연종료"; //"POST_STATE_FIN";
        break;

      case 1:
        return "임시저장"; //"POST_STATE_TEMP"
        break;

      case 2:
        return "상연중"; //"POST_STATE_CUR"
        break;

      default:
        console.log(state_int);
        return "POST_UNDEFINDE"
    }
  },
});

Template.searchResult.events({
  'click .reserve_cancel': function(e) {
    e.preventDefault();

    if ( confirm( '정말로 예약을 취소 하시겠습니까? Are you really want to cancel a resveration?' ) ) {
      var reserveID = $(e.target).attr('id');
      // console.log(reserveID);

      Meteor.call('cancelReserve', reserveID, function(error, result) {
        if (error) {
          // console.log("got error");
          return throwError(error.reason);
        } else {
          // console.log("cancelReserve() succeed");

          var oldResult = Session.get('reserveCancelFindResult');
          // console.log(oldResult);
          for (var i = 0; i < oldResult.length; i++) {
            for (var j = 0; j < oldResult[i].guests.length; j++) {
              if (oldResult[i].guests[j].reserve_id == reserveID) {
                oldResult[i].guests.pop(oldResult[i].guests[j]);
                break;
              }
            }
            if (oldResult[i].guests.length == 0) {
              oldResult.pop(oldResult[i]);
            }
          };

          // console.log(oldResult);
          Session.set('reserveCancelFindResult', oldResult);

        }
      });

    }
  }



});
