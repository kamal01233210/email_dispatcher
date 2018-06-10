var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;

router.post('/:action',function(req,res,next){
	var action = req.params.action;

  	if(action=='send'){//send email
  		console.log(req.body);
		var from_email = new helper.Email('sehrawatkamal@gmail.com');
		var to_email = new helper.Email(req.body.recipient);
		var subject = req.body.subject;
		var content = new helper.Content('text/html', req.body.content);
		var mail = new helper.Mail(from_email, subject, to_email, content);

		var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
		var request = sg.emptyRequest({
		  method: 'POST',
		  path: '/v3/mail/send',
		  body: mail.toJSON(),
		});

		sg.API(request, function(error, response) {
			if(error){
				res.json({
					confirmation:'fail',
					message:error
				});
				return;
			}
		  	res.json({
				confirmation:'success',
				message:response
			});
		});


	/*	res.json({
			confirmation:'success',
			action:action
		});
	}*/
}
});

/* GET users listing. */
router.get('/:action', function(req, res, next) {
	var action = req.params.action;

  	if(action=='send'){//send email

		var from_email = new helper.Email('sehrawatkamal@gmail.com');
		var to_email = new helper.Email('kamal.sehrawat@timesinternet.in');
		var subject = 'TEST!';
		var content = new helper.Content('text/html', 'Hello, Email!');
		var mail = new helper.Mail(from_email, subject, to_email, content);

		var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
		var request = sg.emptyRequest({
		  method: 'POST',
		  path: '/v3/mail/send',
		  body: mail.toJSON(),
		});

		sg.API(request, function(error, response) {
			if(error){
				res.json({
					confirmation:'fail',
					message:error
				});
				return;
			}
		  console.log(response.statusCode);
		  console.log(response.body);
		  console.log(response.headers);
		});


	/*	res.json({
			confirmation:'success',
			action:action
		});
	}*/
}
});

module.exports = router;
