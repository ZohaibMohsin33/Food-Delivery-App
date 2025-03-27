import { Router } from "express";
import { check } from "express-validator";
import * as Controller from "../controllers/userController.js"; // Use named imports if necessary
import * as productController from "../controllers/productController.js";
import * as orderController from "../controllers/orderController.js";

const router = Router();

// Use .post() for POST requests
router.route("/createuser").post([
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('location', 'Location is required').not().isEmpty(),
], Controller.createUser);

router.route("/loginuser").post([
    check('email', 'email is required').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], Controller.loginUser)


//For Data Display 
router.route("/displaydata").post(productController.displayData);

//For Order Data

router.route("/orderdata").post(orderController.orderData);
router.route("/myorderdata").post(orderController.myOrders)

export default router;
