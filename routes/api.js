var express = require('express');
var router = express.Router();
var utils = require('../utils');

router.post('/:action',function(req,res,next){
	var action = req.params.action;

  	if(action=='send'){//send email

		utils.Email.sendEmail(req.body)
		.then(function(response){
			res.json({
				confirmation:'success',
				response:response
			})
		})
		.catch(function(err){
			res.json({
				confirmation:'fail',
				message:err
			})
		})
	}
});



module.exports = router;
