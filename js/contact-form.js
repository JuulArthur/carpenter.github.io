
jQuery(document).ready(function(){

	//if submit button is clicked
	$('#submit').click(function () {

		//Get the data from all the fields
		var name = $('input[name=name]');
		var email = $('input[name=email]');
		var subject = $('input[name=subject]');
		var comment = $('textarea[name=message]');

		//Simple validation to make sure user entered something
		//If error found, add hightlight class to the text field
		if (name.val()=='') {
			name.addClass('hightlight');
			return false;
		} else name.removeClass('hightlight');

		if (email.val()=='') {
			email.addClass('hightlight');
			return false;
		} else email.removeClass('hightlight');

		//E-mail address validation

		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if(reg.test(email.val()) == false) {
			email.addClass('hightlight');
			return false;
		} else email.removeClass('hightlight');

		if (comment.val()=='') {
			comment.addClass('hightlight');
			return false;
		} else comment.removeClass('hightlight');

		//organize the data properly
		var data = 'name=' + name.val() + '&email=' + email.val() + '&subject=' +
		subject.val() + '&comment='  + encodeURIComponent(comment.val());

		//disabled all the text fields
		$('.contact input, .contact textarea').attr('disabled','true');

		//show the loading sign
		$('.loading').show();

		//start the ajax
		$.ajax({
			//this is the php file that processes the data and send mail
			url: "http://mandrillapp.com/api/1.0/messages/send.json",

			//GET method is used
			type: "POST",

			data: {
		    ‘key’: ‘KXaPKsnltOmpYNymwVEmIA’,
		    ‘message’: {
		      ‘from_email’: email,
		      ‘to’: [
		          {
		            ‘email’: ‘juularthur92@gmail.com’,
		            ‘name’: name,
		            ‘type’: ‘to’
		          },
		        ],
		      ‘autotext’: ‘true’,
		      ‘subject’: subject,
		      ‘html’: comment
		    }
		  }
		}).done(function(response) {
   	$('.contact-form').hide(600);

		//show the success message
		$('.form-success').fadeIn('slow');
 	});
});
