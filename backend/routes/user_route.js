const express = require('express');
const cors = require("cors");
const { check } = require('express-validator');

const userController = require('../controllers/users-controller');

const router = express.Router();

router.use(cors());

router.post('/create-user',
  [
    check('firstName').not().isEmpty(),
    check('lastName').not().isEmpty(),
    check('username').not().isEmpty(),
    check('password').not().isEmpty().isLength({ min: 8 }),
    check('dateOfBirth').not().isEmpty(),
    check('email').not().isEmpty().normalizeEmail().isEmail(),
    check('country').not().isEmpty(),
    check('state').not().isEmpty(),
    check('phoneNumber').not().isEmpty(),
    check('mobileNumber').not().isEmpty(),
  ],
  userController.createUser
);

router.get('/all-users', userController.getUsers);
router.delete('/delete-user/:id', userController.deleteUser);
router.patch('/update-user/:id', userController.updateUser);

module.exports = router;
