if(Drupal.jsEnabled)
{
    $(document).ready(
	function(){
            var submit_button = document.getElementById("submit_info");
	    var dataPicker = document.getElementById("datapicker_img");
	    dataPicker.onclick = function() {
		WdatePicker({el:'birthday_text',dateFmt:'yyyy-MM-dd',lang:'en'});
	    }
            var ASI_pass_submit = document.getElementById("ASI_pass_submit");
	    $("#link").fancybox({
		onClosed: function () { document.getElementById("passConfirmation").style.display = "none"; }
	    });
	    var new_pass = '';
	    submit_button.onclick = function() {
		if ($("#edit-new-password-pass1").val()!='' && $("#edit-new-password-pass2").val()!='') {
		    if ($("#edit-new-password-pass1").val()==$("#edit-new-password-pass2").val()) {
			new_pass = $("#edit-new-password-pass1").val();
			$("#pass_info").css("display","none");
			document.getElementById("passConfirmation").style.display = "block";
			$("#link").trigger('click');
		    }
		}
		if ($("#edit-new-password-pass1").val()=='' && $("#edit-new-password-pass2").val()=='') {
		    document.getElementById("passConfirmation").style.display = "block";
		    $("#link").trigger('click');
		}
		if ($("#edit-new-password-pass1").val()!=$("#edit-new-password-pass2").val()) {
		    $("#pass_info").css("display","block");
		}
	    }
            ASI_pass_submit.onclick = function() {
		var pass = $("#pass").val();
		var username = $("#edit-username").val();
		var familyName = $("#edit-family-name").val();
		var givenName = $("#edit-given-name").val();
		if (document.getElementById("edit-gender").options[0].selected) {
		    var gender = "MALE";
		}
		else {
		    var gender = "FEMALE";
		}
		var birthday = $("#birthday_text").val();
		var streetAddress = $("#edit-street-address").val();
		var postCode = $("#edit-postal-code").val();
		var locality = $("#edit-locality").val();
		var description = $("#edit-description").val();
                var url = Drupal.settings.asi.pass.confirmation;
		$.post(url,{'username':username,'pass':pass,'familyName':familyName,'givenName':givenName,'gender':gender,'birthday':birthday,'streetAddress':streetAddress,'postCode':postCode,'locality':locality,'description':description,'newPass':new_pass}, function(data){
		    //get the json info
		    document.getElementById("response_info").innerHTML = "";
		    switch (data) {
			case "1":
			    document.getElementById("response_info").innerHTML = "Can not update user's info in ASI!";
			    $("#link").trigger('click');
			    break;
			case "2":
			    document.getElementById("response_info").innerHTML = "Password is wrong!";
			    $("#link").trigger('click');
			    break;
			case "3":
			    document.getElementById("response_info").innerHTML = "Can not initial the cURL!";
			    $("#link").trigger('click');
			    break;
			case "4":
			    $.fancybox.close();
			    location.reload(true); 
			    break;
		    }
		});    
            }   
        }
    );
}