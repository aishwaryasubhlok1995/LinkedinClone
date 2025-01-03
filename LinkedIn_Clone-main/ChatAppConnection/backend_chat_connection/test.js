var jwtDecode = require("jwt-decode");
var token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzg0MjMxODksImV4cCI6MTUzODQzMzI2OX0.R3yPel-b9aw1134cO0ME2ykI7R1iktGToMZ_h0RCI0I";

var decoded = jwtDecode(token);
console.log(decoded);
