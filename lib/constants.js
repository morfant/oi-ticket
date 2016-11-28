BASE_DIR = "/Users/giy/oi-ticket"

UPLOAD_IMG_MAXIUM = 3;
UPLOAD_DIR = '/host_Uploads/';
UPLOAD_DIR_TMP = '/host_Uploads/tmp/';
UPLOAD_DIR_SUBMIT = '/host_Uploads/submitting/';

UPLOAD_DIR_SERV = '/opt/uploads/oi-ticket/';
UPLOAD_DIR_TMP_SERV = UPLOAD_DIR_SERV + 'tmp/';
UPLOAD_DIR_SUBMIT_SERV = UPLOAD_DIR_SERV + 'submitting/';

UPLOAD_DIR_PWD_SERV = process.env.PWD + UPLOAD_DIR;
UPLOAD_DIR_PWD_TMP_SERV = process.env.PWD + UPLOAD_DIR_TMP;
UPLOAD_DIR_PWD_SUBMIT_SERV = process.env.PWD + UPLOAD_DIR_SUBMIT;

// POSTED_DIR = "/posted_Uploads/";


// post state
POST_STATE_CUR = 2;
POST_STATE_TEMP = 1;
POST_STATE_FIN = 0;

// reservation
SEAT_LIMIT_PER_PERSON = 5;


// settings
SLIDE_INTERVAL_MAX = 5000;
SLIDE_INTERVAL_MIN = 2000;
