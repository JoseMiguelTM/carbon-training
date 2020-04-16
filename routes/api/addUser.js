module.exports = (app) => {
    app.post('/addUser', function(req, res, next) {
        console.log('add user api begins here!')
        let newUser = req.body;
        let db2Query = "INSERT INTO LGX65344.USERS(FIRSTNAME, LASTNAME, W3ID, PASSWORD, BUSINESSUNIT, TECHNOLOGIES) VALUES ('"+newUser.firstName+"', '"+newUser.lastName+"', '"+newUser.w3id+"', '"+md5(newUser.password)+"', '"+newUser.businessUnit+"', '"+newUser.technologies+"');";
        console.log(db2Query);
        ibmdb.open(connect, function(err, conn) {
          if(err) {
            return res.json({success: -1, message: err, code: err.sqlcode});
          }
          conn.query(db2Query, function(err, data) {
            if(err) {
              return res.json({success: -1, message: err, code: err.sqlcode});
            }
            conn.close();
            return res.json({success: 1, code: 200});
          })
        })
      });
    app.post('/api/addUser', []);
}