const Pool = require('pg-pool');
const url = require('url');

// const params = url.parse('postgres://<user>:<password>@<host>:<port>/<database>');
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
};

const pool = new Pool(config);

var result = pool.query('SELECT * FROM blackboxcountry ORDER BY 1 LIMIT 10', function (err, res) {

    for (var i = 0; i < res.rows.length; i++) {

        console.log('blackboxcountry: %s', res.rows[i].code);
    }
});
// console.log("result: %s", result);

/*
  Transforms, 'progres://DBuser:secret@DBHost:#####/myDB', into
  config = {
    user: 'DBuser',
    password: 'secret',
    host: 'DBHost',
    port: '#####',
    database: 'myDB',
    ssl: true
  }
*/