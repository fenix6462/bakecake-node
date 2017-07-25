var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'public/uploads/');
	},
	filename: function(req,file,cb){
		cb(null,Date.now() + file.originalname);
	}
})
var upload = multer({ storage: storage }).any();

module.exports.uploadImage = function(req, res, next){
	upload(req, res, function(err){
		if(err){
			console.log('File upload error');
			res
				.status(500)
				.json(err);
		} else {
			console.log('File upload success');
			res
				.status(200)
				.json(req.files);
		}
	})
}