module.exports = {
  servers: {
    one: {
      host: '218.38.52.169',
      username: 'root',
      // pem:
      password: 'dlwhdgns'
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'oi-ticket',
    path: '/Users/giy/oi-ticket',
    volumes: {
	"/opt/uploads/oi-ticket": "/host_Uploads",
	"/opt/uploads/oi-ticket/submitting": "/host_Uploads/submitting"
    },
    docker: {
//	image:'kadirahq/meteord'
	image:'abernix/meteord:base',
//	image: "joshjoe/meteor-graphicsmagick",
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      // ROOT_URL must be set to your correct domain (https or http)
     // ROOT_URL: 'http://tourismguy.cafe24.com',
      ROOT_URL: 'http://art52.net',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime:260 
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
