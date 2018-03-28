(function(){

	var signPg = document.getElementById('signDiv');
	var regPg = document.getElementById("registerDiv");
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.font = "80px helvetica";
	ctx.fillStyle = "white";
	var myOutput = document.getElementById('output');


	var element = document.getElementById("output");

	var ul = document.createElement("ul");
	ul.setAttribute("id", "myUl");
	element.appendChild(ul);

	var users = [];

	var code = "";

	window.onload = function (){

		document.getElementById("regPage").addEventListener("click", registerPage);
		document.getElementById("cancel").addEventListener("click", cancelBtn);
		document.getElementById("join").addEventListener("click", registerUser);
		document.getElementById("signIn").addEventListener("click", signInUser);

		//Create User
		createUsers();

	};

	// Generate my captcha
	function generateCaptcha() {

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var charCodes = new Array(
			48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122
		);
		var i;
		for (i=0;i<8;i++) {
			var a = String.fromCharCode(charCodes[Math.floor(Math.random() * charCodes.length)]);
			var b = String.fromCharCode(charCodes[Math.floor(Math.random() * charCodes.length)]);
			var c = String.fromCharCode(charCodes[Math.floor(Math.random() * charCodes.length)]);
			var d = String.fromCharCode(charCodes[Math.floor(Math.random() * charCodes.length)]);
			var e = String.fromCharCode(charCodes[Math.floor(Math.random() * charCodes.length)]);
			var f = String.fromCharCode(charCodes[Math.floor(Math.random() * charCodes.length)]);
			var g = String.fromCharCode(charCodes[Math.floor(Math.random() * charCodes.length)]);
			var h = String.fromCharCode(charCodes[Math.floor(Math.random() * charCodes.length)])
		}

		code = "";

		code += a + '' + b + '' + '' + c + '' + d + '' + e + '' + f + '' + g + '' + h;

	    ctx.fillText(code,60, 100,180);

	}

	// Change the page from 'log in' to 'Register' and vice versa
	function registerPage() {
		signPg.style.display = "none"
		regPg.style.display = "block";
		myOutput.style.display = "none";

		//Create the captcha
		generateCaptcha();
	}

	function cancelBtn() {
		signPg.style.display = "block"
		regPg.style.display = "none";
		myOutput.style.display = "block";

	}

	// for fake and register new users
	function user(id,password,date,email) {
	  this.id = id;
	  this.password = password;
	  this.date = date;
	  this.email = email;
	}

	user.prototype.toString = function userToString() {

		var ret = "* ID = " + this.id + "* PASSWORD = " + this.password + "* JOINED = " + this.date + "* EMAIL = " + this.email ;

		return ret;
	}

	user.prototype.get = function(prop) {

		var property;

		switch(prop){

			case "Id":
				property = this.id;
				break;
			case "Password":
				property = this.password;
				break;

			case "Email":
				property = this.email;
				break;
		}

		return property;

	};

	function createUsers(){

		var user1 = new user('Jobo', 'jobo123', 'Fri Jan 27 2018', 'jobo27@gmail.com');
		var user2 = new user('Toto', 'toto123', 'Thu Feb 25 2018', 'toto25@gmail.com');
		var user3 = new user('Yoyo', 'yoyo123', 'Mon Apr 20 2018', 'yoyo20@gmail.com');

		users.push(user1);
		users.push(user2);
		users.push(user3);

		pushUsers();

	}

	function pushUsers(){
		text = "";

		for(i=0; i< users.length; i++){

			text += "<li >" + users[i].toString()+ "</li>";

		};
		document.getElementById('myUl').innerHTML = text ;
	}

	function registrationSuccess (){

		signPg.style.display = "block"
		regPg.style.display = "none";
		myOutput.style.display = "block";

		document.getElementById("regId").value = "";
		document.getElementById("regPasswrd").value = "";
		document.getElementById("regMail").value = "";
		document.getElementById('regCaptcha').value = "";
	}

	// Sign In User
	function signInUser() {

		var signIninput = document.getElementById('myId').value;
		var passwordInput = document.getElementById('myPasswrd').value;

			try {

				if(!signIninput){
					console.error("SIGN IN FAILED");
					console.log("SIGN IN ENDED")
					throw "Sign in error. \nAn ID was not provided" ;
				}
				else if(!passwordInput){

					console.error("SIGN IN FAILED");
					console.log("SIGN IN ENDED")
					throw "Sign in error. \nA password was not provided" ;
				}
				else {
					var userFound = false;
					var userId = 0;
					for (var i = 0; i < users.length; i++)	{
						if (users[i].get("Id") == signIninput)	{
							userId = i;
							userFound = true;
						}
					}

					// If statements
					if (userFound == false)	{
						console.error("SIGN IN FAILED");
						console.log("SIGN IN ENDED")
						throw("Sign in error. \nID provided does not exist");

					}else {
						// use of toget() to receive the users properties!!!
						if(passwordInput !=  users[userId].get("Password")){
							console.log("ID EXISTS");
							console.error("SIGN IN FAILED");
							console.log("SIGN IN ENDED")
							throw "Sign in error. \nPassword is incorrect";
						}

						else{
							document.getElementById('myId').value = "";
							document.getElementById('myPasswrd').value = "";

							console.log("SIGN IN - ENETERED ID '" + signIninput + "' AND PSW " + passwordInput);
							console.log("ID EXISTS");
							console.log("PASSWORD CORRECT");
							console.log("SIGN IN SUCESSFULL");
							console.log("SIGN IN ENDED")
							throw "USER " + users[userId].get("Id") + " SUCCESSFULLY SIGNED IN";
						}

					}
				}

		    }
		    catch(err) {
				//alerts
				alert(err);
		    }
	}


	function registerUser(){


		//Get values
		var userRegId = document.getElementById("regId").value;
		var userRegPassword = document.getElementById("regPasswrd").value;
		var userRegEmail = document.getElementById("regMail").value;
		var userRegCaptcha = document.getElementById('regCaptcha').value;

		var idStartWithLetter = /^[a-z]/i;

		var pswdMinLength = /.{8,}/;
		var pswdThreeLetters = /[a-z]{3}/i;
		var pswTwoDigits = /\d{2}/;

		var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		try {

			//if space not filled
			if(!userRegId){
				console.error("REGISTRATION FAILED");
				console.log("REGISTRATION ENDED");
				throw "Registration error. \nPlease fill the ID"

			} else if(!userRegPassword){
				console.error("REGISTRATION FAILED");
				console.log("REGISTRATION ENDED");
				throw "Registration error. \nPlease fill the PASSWORD"

			} else if(!userRegEmail){
				console.error("REGISTRATION FAILED");
				console.log("REGISTRATION ENDED");
				throw "Registration error. \nPlease fill the EMAIL"

			} else if (!userRegCaptcha) {
				console.error("REGISTRATION FAILED");
				console.log("REGISTRATION ENDED");
				throw "Registration error. \nPlease fill the CAPTCHA"

			}


			// fail registration process and success
			var userFound = false;
			var userId = 0;
			for (var i = 0; i < users.length; i++)	{
				if (users[i].get("Id") == userRegId)	{
					userId = i;
					userFound = true;
				}
			}

			if(userFound === true){

				console.error("REGISTRATION FAILED");
				console.log("REGISTRATION ENDED");
				throw "Registration error. \nID is already in the database"

			} else if(!idStartWithLetter.test(userRegId)) {

				console.error("REGISTRATION FAILED");
				console.log("REGISTRATION ENDED");
				throw "Registration error. \nID does not start with a letter"

			} else{

				console.log("REGISTRATION - ENTERED ID '" +userRegId+ "' - PSWD '" +userRegPassword+ "' - EMAIL '" +userRegEmail+ "' - CAPTCHA '" + userRegCaptcha + "'")
				console.log("ID IS AVAILABLE");
				console.log("ID STARTS WITH A LETTER");

				if(!pswdMinLength.test(userRegPassword)){

					console.error("REGISTRATION FAILED");
					console.log("REGISTRATION ENDED");
					throw "Registration error. \nPassword is less than 8 characters in length"

				} else if(!pswdThreeLetters.test(userRegPassword)){

					console.error("REGISTRATION FAILED");
					console.log("REGISTRATION ENDED");
					throw "Registration error. \nPassword does not contain at least 3 consecutive letters"

				} else if(!pswTwoDigits.test(userRegPassword)){

					console.error("REGISTRATION FAILED");
					console.log("REGISTRATION ENDED");
					throw "Registration error. \nPassword does not contain at least 2 digits"

				} else{

					console.log("PSWD IS LONG ENOUGH");
					console.log("PSWD HAS RIGHT MIX 0F CHARACTERS");


					if(!emailPattern.test(userRegEmail)){

						console.error("REGISTRATION FAILED");
						console.log("REGISTRATION ENDED");
						throw "Registration error. \nEmail address does not match the required pattern"

					} else {

						console.log("EMAIL HAS CORRECT FORMAT");

						if(code !== userRegCaptcha){

							generateCaptcha();
							console.error("REGISTRATION FAILED");
							console.log("REGISTRATION ENDED");
							throw "Registration error. \nCaptcha code does not match"

						} else{

							console.log("CAPTCHA MATCHED");
							console.log("REGISTRATION ENDED")
							registrationSuccess();
							//Date need to be push in array of user
							var d = new Date();
							var newRegUser = new user( userRegId, userRegPassword, d.toDateString(), userRegEmail);
							users.push(newRegUser);
							pushUsers();
							throw "NEW USER SUCCESSFULLY REGISTERED. \n* ID = " + userRegId + "* PASSWORD = " + userRegPassword + "* JOINED = " + d.toDateString() + "\n* EMAIL = " + userRegEmail + " * .";

						}
					}
				}

			}

		} catch (e) {
			alert(e)
		}

	}

}());
