const { errorResponse } = require("../../utils/responseHelpers");

//check if the user is an admin or not
const protectRoutes = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, proceed to the route
  } else {
    errorResponse(res, "Forbidden", 403);
  }
};

module.exports = protectRoutes;
