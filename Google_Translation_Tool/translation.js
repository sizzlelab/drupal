var original_text;
var translated_text;
var langCode;
google.load("language", "1");
if(Drupal.jsEnabled)
{
    $(document).ready(
        function(){
	    //input 'Translate to' button
	    $("#edit-original-text").after("<input type='button' id='translate' value='Translate to' onclick='translationtext()' />");
	    //input language select
 	    $("#translate").after("<select name='language-list' style='width:120' id='change_language'>");
	    evaluate();
	    
	    original_text = document.getElementById('edit-original-text');
	    original_text.value = '';
	    translated_text = document.getElementById('edit-translation-text');
	    translated_text.value = '';
	    translated_text.readOnly = 'readonly';
	}
    );
}

/**
 * Translating the text
 */
function translationtext() {
    var languages = document.getElementsByName("language-list");
    var languages_obj = languages[0];
    var aim_language;
    //test the original language
    google.language.detect(original_text.value, function(result) {
	// If there wasn't an error in the request
	if (!result.error) {
	    langCode = result.language;
	    for (var i=0; i<languages_obj.length;i++) {
		if(languages_obj.options[i].selected) {
		    aim_language = languages_obj.options[i].value;
		    //Using cookie to record the last language which the user chose
		    document.cookie = "last_language="+aim_language;
		}
	    }
	    //translate
	    var translated = document.getElementById("edit-translation-text");
	    google.language.translate(original_text.value, langCode, aim_language, function(result) {
		if (result.translation) {
		    translated.value = result.translation;
		}
	    });
	}
    });
    
}

/**
 * Evaluating the list of different languages
 */
function evaluate() {
      var languages = document.getElementsByName("language-list");
      var languages_obj = languages[0];	
      var langName;
      var number=0;
      var language_text = new Array();
      var language_value = new Array();
      var get_the_cookie = false;
      //input default language
      var default_language = new Array('en','zh','nl','it','fi');
      language_text[0] = 'ENGLISH';
      language_value[0] = 'en';
      language_text[1] = 'CHINESE';
      language_value[1] = 'zh';
      language_text[2] = 'DUTCH';
      language_value[2] = 'nl';
      language_text[3] = 'ITALIAN';
      language_value[3] = 'it';
      language_text[4] = 'FINISH'
      language_value[4] = 'fi';
      //if you change the default language, remeber to modify this number
      number = 5;
      
      for (var i in google.language.Languages) {
        var thisLangCode = google.language.Languages[i];
	//check if it's the default_language
	var default_check = false;
	for(var la in default_language)
	{
	    if(thisLangCode==default_language[la])
	    {
		default_check = true;
		break;
	    }
	}
	if(!default_check)
	{
	    language_text[number] = i;
	    language_value[number] = thisLangCode;
	    number++;
	}
      }
      
      //get select language from 
      var get_last_language = getCookieValue('last_language');
      //put languages to language-list
      languages_obj.options.length = 91;
      for (var i=0; i<languages_obj.length;i++) {
	languages_obj.options[i].value = language_value[i];
        languages_obj.options[i].text = language_text[i];
	//check if this language is the selected one
	if (language_value[i] == get_last_language) {
            languages_obj.options[i].selected = 'selected';
            var get_the_cookie = true;
        }
      }
      if(get_the_cookie==false)
      {
	languages_obj.options[0].selected = 'selected';
      }
}

/**
 * fetch cookie value by attribute. example: if cookie likes "key=value", the key is attribute, the value is value
 */
function getCookieValue(attribute){
    cookieStr = document.cookie;
    var cookieValue = cookieStr.split("; ");
    for(var i=0;i<cookieValue.length;i++){
        var arr = cookieValue[i].split("=");
        if(attribute==arr[0]){
            var value=arr[1];
            break;
	}
    }
    return value;
}

