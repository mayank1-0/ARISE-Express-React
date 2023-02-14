var express = require("express");
var router = express.Router();
const commonController = require("../controller/common_controller");

/**
 * @swagger
 * /common/login-user:
 *   post:
 *     tags:
 *       - common
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login_type:
 *                 type: string
 *                 description: User's account type
 *                 example: Student
 *               email_id:
 *                 type: string
 *                 description: User's email.
 *                 example: Hagrid
 *               password:
 *                 type: string
 *                 description: User's's account password.
 *                 example: Rubius 
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *       401:
 *         description: User not found || Invalid password
 *       500:
 *         description: Something went wrong
 */

router.post("/login-user", commonController.login_user);

module.exports = router;
