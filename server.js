var ibmdb = require('ibm_db');
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

const db2 = {
    db: "BLUDB",
    hostname: "dashdb-txn-sbox-yp-lon02-01.services.eu-gb.bluemix.net",
    port: 50000,
    username: "lgx65344",
    password: "c7czb^bk3ddq07d0"
};

let connect = 
"DRIVER={DB2};DATABASE=" + db2.db + 
";UID=" + db2.username + 
";PWD=" + db2.password + 
";HOSTNAME=" + db2.hostname + 
";port=" + db2.port;






/*ibmdb.open(connect, function (err,conn) {
    let db2Query = "SELECT * FROM LGX65344.users";
    if (err){
      return response.json({success:-1, message:err});
    }
    conn.query(db2Query, function (err, data) {
      if (err){
        return response.json({success:-1, message:err});
      }
      conn.close(function () {
          Object.keys(data).map(function(key, index) {
              console.log("MAIL: ", data[key].USEREMAIL, " TYPE: ", data[key].USERTYPE);
          })
      });
    });
  });
*/

//ibmdb.open(connect).then(() => console.log('DB2 Successfully connected!')).catch(err => console.log(err));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/checkUser', function(req, res, next) {
  console.log('okay!');
  let email = req.body.email;
  let pass = req.body.password;
  ibmdb.open(connect, function(err, conn) {
    let db2Query = "SELECT * FROM users WHERE USEREMAIL = '"+ email +"'";
    if(err) {
      return res.json({success: -1, message: err});
    }
    conn.query(db2Query, function(err, data) {
      if(err) {
        return res.json({success: -1, message: err})
      }
      conn.close(function() {
        Object.keys(data).map(function(key, index) {
          console.log("MAIL:", data[key].USEREMAIL, "TYPE: ", data[key].USERTYPE);
          console.log("Found!");
        })
      })
    })
  });
})

const port = process.env.PORT || 3001;

http.createServer(app).listen(port, function() {
    console.log('Express server is up and listening on port ' + port);
})