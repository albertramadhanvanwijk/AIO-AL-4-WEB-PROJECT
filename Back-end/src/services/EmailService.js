var nodemailer = require( 'nodemailer')
// var moment = require('moment')

async function sendEmail(data){
	return new Promise((resolve, reject)=> {
		var transport = nodemailer.createTransport({
			host: 'mail.aio.co.id',
			port: '587',
			secure: false,
			auth: {
				user: 'appsskb@aio.co.id',
				pass: 'Plicaskb1234'
			},
			tls: {rejectUnauthorized: false},
			debug: true
		});

		var message = {
			subject : data.subject,
			from    : '"AL4" <appsskb@aio.co.id>',
			to      : data.to,
			cc 		: data.cc,
			text    : data.text,
			html    : data.body,
			attachments    : data.attachments
		};
	
		transport.sendMail(message,function (err) {
			if(err){
				console.log(err);
				reject(err)
			}else{
				resolve(true)
			}
		});
	})
}

module.exports = {
	sendEmail
};