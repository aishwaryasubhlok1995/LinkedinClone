var Connection = require("../mongodb/connection");
const { OrderedMap } = require("immutable");

function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  if (msg.messageType === "connectuser") {
    console.log("Find all reservation from " + msg.messageBody.userId);
    const connector = msg.messageBody.connector;
    const connectee = msg.messageBody.connectee;

    if (connector && connectee) {
      const query = { userId: connectee };
      Connection.findOne(query, function(err, connection) {
        if (err) {
          callback(null, {
            success: false,
            message: "There is a system error.Please try again"
          });
        } else {
          console.log("Connectee found:" + JSON.stringify(connection));
          //load into requested connection and accepted connection
          var isAlreadyReceived = false;
          var isAlreadyConnected = false;
          if (connection !== null) {
            connection.receivedConnections.map((connectorId, index) => {
              if (connector === connectorId) {
                isAlreadyReceived = true;
                callback(null, {
                  success: false,
                  message: "You already request to connect"
                });
              }
            });
            connection.acceptedConnections.map((connectorId, index) => {
              isAlreadyConnected = true;
              callback(null, {
                success: false,
                message: "You are already connected"
              });
            });

            //try to save a connect
            if (!isAlreadyConnected && !isAlreadyReceived) {
              connection.receivedConnections.push(connector);
              connection.save((error, updatedConnection) => {
                if (error) {
                  callback(null, {
                    success: false,
                    message: "TThere is a system error.Please try again"
                  });
                }
                callback(null, {
                  success: true,
                  message: "You successfully request to connect"
                });
              });
            }
          } else {
            //create a new connection
            let newConnection = new Connection();
            newConnection.userId = connectee;
            newConnection.receivedConnections.push(connector);
            newConnection.acceptedConnections = [];
            newConnection.save((error, newconn) => {
              if (error) {
                callback(null, {
                  success: false,
                  message: "There is a system error.Please try again"
                });
              }
              callback(null, {
                success: true,
                message: "you are successfully to request connect"
              });
            });
          }
        }
      });
    }
  }

  if (msg.messageType === "getconnection") {
    console.log("Find all reservation from " + msg.messageBody.userId);
    const userId = msg.messageBody.userId;

    if (userId) {
      const query = { userId: userId };
      Connection.findOne(query, function(err, connection) {
        if (err) {
          callback(null, {
            success: false,
            message: "There is a system error.Please try again",
            connection: null
          });
        } else {
          console.log("Connectee found:" + JSON.stringify(connection));
          //load into requested connection and accepted connection
          if (connection === null) {
            callback(null, {
              success: false,
              message: "unable to retrieve user connecion",
              connection: null
            });
          } else {
            callback(null, {
              success: true,
              message: "Able to retrieve all connecions",
              connection: connection
            });
          }
        }
      });
    }
  }

  if (msg.messageType === "getRequestedConnection") {
    console.log("Find all reservation from " + msg.messageBody.userId);
    const userId = msg.messageBody.userId;

    if (userId) {
      const query = { receivedConnections: userId };
      Connection.find(query, function(err, connections) {
        if (err) {
          callback(null, {
            success: false,
            message: "There is a system error.Please try again",
            connections: null
          });
        } else {
          console.log("Connectee found:" + JSON.stringify(connections));
          //load into requested connection and accepted connection
          if (connections === null) {
            callback(null, {
              success: false,
              message: "unable to retrieve any requested connecion",
              connections: null
            });
          } else {
            callback(null, {
              success: true,
              message: "Able to retrieve all requestedconnecions",
              connections: connections
            });
          }
        }
      });
    }
  }

  if (
    msg.messageType === "acceptconnection" ||
    msg.messageType === "rejectconnection"
  ) {
    console.log("Find all reservation from " + msg.messageBody.userId);
    const connector = msg.messageBody.connector;
    const connectee = msg.messageBody.connectee;

    if (connector && connectee) {
      const query = { userId: connectee };
      Connection.findOne(query, function(err, connection) {
        if (err) {
          callback(null, {
            success: false,
            message: "There is a system error.Please try again"
          });
        } else {
          console.log("Connectee found:" + JSON.stringify(connection));
          //load into requested connection and accepted connection

          if (connection !== null) {
            //try to move from requested connection to acceptedconnection
            connection.receivedConnections = connection.receivedConnections.filter(
              (value, index) => {
                return value !== connector;
              }
            );
            if (msg.messageType === "acceptconnection")
              connection.acceptedConnections.push(connector);
            connection.save((error, updatedConnection) => {
              if (error) {
                callback(null, {
                  success: false,
                  message: "There is a system error.Please try again"
                });
              }
              callback(null, {
                success: true,
                message: "You successfully accept or reject the connection"
              });
            });
          } else {
            callback(null, {
              success: false,
              message: "Unable to find the connection"
            });
          }
        }
      });
    }
  }
}

exports.handle_request = handle_request;
