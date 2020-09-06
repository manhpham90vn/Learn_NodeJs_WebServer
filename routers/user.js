const express = require('express')
const router = express.Router()

const UserControler = require('../controllers/user')

router.route('/1').get(UserControler.index)

module.exports = router
