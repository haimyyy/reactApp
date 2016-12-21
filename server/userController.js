

exports.registerUser = function(req, res){
	console.log("in register user")
	try{
		var user = req.body;
	}
	catch(err){
		console.log("failed to get body " + err);
	}
	console.log("try to update " , user);
	db.model('users').findOne({ id : user.id }, function(err, result){	//check if user exists
		if(err){
			console.log("error finding user");
			res.json({status:0});
			return console.error(err);
		}
		else if(!result){			//if we didnt get a result create a new user
			console.log("adding new user")
			var newUser =  new User(user);
			newUser.save(function(err, result){
				if(err) {
					console.log("error inserting email: " + user.email);
					return console.error(err)
				}
				res.json({status:1,res:result})
			});
			
		}
		else{						//if we got a result update the user
			db.model('users').findOneAndUpdate( { email : user.email }, user, { upsert : false },
				function (err, result)
				{
					if (err) {
						console.log("found error inserting");
						res.json({status:0})
						return console.error(err);
					}
					res.json({status:1, res:result})
				})		
		}
	});
}