var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:action', function(req, res, next) {
  	var action = req.params.action;

  	if(action=='send'){//send email
		res.json({
			confirmation:'success',
			action:action
		});
	}

});

module.exports = router;
