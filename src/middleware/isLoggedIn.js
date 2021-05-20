const jwt = require("jsonwebtoken");
const path = require("path");

const isLoggedIn = (req, res, next) => {
	const token = req.headers["x-access-token"];
	if (!token) {
		return res
			.status(403)
			.sendFile(
				path.join(__dirname, "../", '../', "web", "view", "signin.html")
			);
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized!" });
		}
		req.userId = decoded.id;
		next();
	});
};

module.exports = isLoggedIn;
