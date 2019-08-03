var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');

module.exports = function(query, parameters, callback){

  oracledb.getConnection(
    {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString
    },
    function(err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log('Connection was successful!');
      sql =  query;
      binds = parameters;
      options = {
        outFormat: oracledb.OBJECT,   // query result format
        autoCommit:true,
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning
      };
      result = connection.execute(sql,binds,options, function(err, results) {
        if (err) {
          console.log('Failed to query table in Oracle: '+ err);
          results = null;
          return callback(err)
        }
        console.log("succesfull")
        connection.close();
        return callback(null, results);
      });
    });
};