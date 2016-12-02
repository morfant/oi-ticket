  // logger.log('info', 'Hello distributed log files!');
  // logger.info('Hello again distributed logs');

  // logger.level = 'debug';
  // logger.log('debug', 'Now my debug messages are written to console!');



if(Meteor.isServer) {

  var winston = require('winston');

  require('winston-papertrail').Papertrail;

  logger = new winston.Logger({ //make global
  	transports: [
  		new winston.transports.Papertrail({
  			host: 'logs2.papertrailapp.com',
  			port: 14835,
  			logFormat: function(level, message) {
  			    return '<<<' + level + '>>> ' + message;
  			}
  		})
  	]
  });

  logger.info('winston logger started!!');

};

//   Meteor.publish('user', function() {
//     var userId = this.userId;
//     logger.info('user connected', {userId: userId});
//
//     this.ready();
//     this.onStop(function() {
//       logger.info('user disconnected', {userId: userId});
//     });
//   });
//
//
//
// //Send Papertrail
//   var Papertrail = Meteor.npmRequire('winston-papertrail').Papertrail;
//
//     logger.add(Papertrail, {
//     host: "logs4.papertrailapp.com",
//     port: 49006, //this will be change from the papertrail account to account
//     logFormat: function(level, message) {
//         return '[' + level + '] ' + message;
//     },
//     inlineMeta: true
//   });
//
// }
//
//
// if(Meteor.isClient) {
//   Meteor.subscribe('events');
// }
//
