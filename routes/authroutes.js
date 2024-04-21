const { Router } = require ('express');
const authController = require ('../controller/authcontroller');
const router = Router();
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

router.get('/', authController.home);
router.post('/createComment', jsonParser, authController.createComment);
router.post('/createReply', jsonParser, authController.createReply);
router.post('/replyToReply', jsonParser, authController.replyToReply);
router.delete('/delete-comment/:id', authController.deleteComment);
router.delete('/delete-reply/:id', authController.deleteReply);
router.delete('/delete-subreply/:id', authController.deleteSubReply);

module.exports = router;