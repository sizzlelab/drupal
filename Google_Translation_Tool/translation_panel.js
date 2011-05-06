
google.load("language", "1");
if(Drupal.jsEnabled)
{
    $(document).ready(
        function(){
	    //input language select
	    evaluate("language-list");
	    
	    $('#edit-original-text').val('');
	    $('#edit-translation-text').attr('readonly','readonly');
	    
	    //create translated text div
	    var $translated_div = $('<div/>');
	    //Click, hide the panel
	    $translated_div.bind('click',
		function(){
		    this.style.display = 'none';
		}
	    );
	    $translated_div.attr('id','translated-text-area');
	    $translated_div.css({
		'border':'2px solid #777',
		'opacity':'0.8',
		'position': 'absolute',
		'background-color': '#fff',
		'padding':'2px 2px 2px 2px',
		'display':'block'
	    });
	    $('body').append($translated_div);
	    
	    $('#translate-content').mouseup(
		function(e){
		    var value = getSelectText();
		    if(value&&value!=''){
			show_translated_text(e,value);
		    }else{
			$('#translated-text-area').css('display','none');
		    }
		}
	    );
	    
	   /* document.oncontextmenu = function(){
		alert("?");
	    }
	    document.body.onclick = function(){
		alert('!');
	    }*/
	}
	
    );
}

/**
 * Show tranlated text
 */
function show_translated_text(e,value){
    $('#translated-text-area').text('Translating...');
    $('#translated-text-area')
	.css({
		'top': (e.pageY)+'px',
		'left': (e.pageX)+'px'
	    }).show('fast');
    
    google.language.detect(value, function(result) {
        if (!result.error && result.language) {
	    var lanCode = $('#content-target-translate-language').val();
	    
	    if(lanCode==result.language){
		$('#translated-text-area').html('The content is already in <font color="red">'+getLanguageName(lanCode)+'</font>. You can change the select box to change the target language.');
		return;
	    }
	    google.language.translate(value, result.language, lanCode, function(result) {
		if (result.translation) {
		    $('#translated-text-area').text(''+result.translation+'');
		}
	    });
	}
    });
    
}

/**
 * get select text from page
 */
function getSelectText(){
    var txt = null;
    if (window.getSelection){  // mozilla FF 
        txt = window.getSelection();
    }else if (document.getSelection){
        txt = document.getSelection();
    }else if (document.selection){  //IE
        txt = document.selection.createRange().text;
    }
    return ''+txt+'';
}


/**
 * get scroll top
 */
function getScrollTop(){
    var top = document.documentElement.scrollTop;
    if(top==undefined||top==0){
	top = document.body.scrollTop;
    }
    return top;
}
/**
 * get scroll left
 */
function getScrollLeft(){
    var left = document.documentElement.scrollLeft;
    if(left==undefined||left==0){
	left = document.body.scrollLeft;
    }
    return left;
}
/**
 * Translating the text
 */
function translationtext() {
    var langCode = $('#text-target-translate-language').val();
    document.cookie = "last_language="+langCode;
    var original_text = $('#edit-original-text').val();
    google.language.translate(original_text, '', langCode, function(result) {
	if (result.translation) {
	    $('#edit-translation-text').val(result.translation);
	}
    });    
}

/**
 * Evaluating the list of different languages
 */
function evaluate(name) {
      var languages = document.getElementsByName(name);
      if(languages==undefined){return;}	
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
      language_value[1] = 'zh-CN';
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
      var get_last_language = readCookie('lanCode');
      if(get_last_language==undefined||get_last_language==''){
	get_last_language = 'en';
      }
      
      for(var key in languages){
	var languages_obj = languages[key];
	//put languages to language-list
	if(languages_obj.options==undefined){continue;}
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

function createCookie(name, value, days) {
    if (days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

/**
 * Go to google translation page
 */
function translate_page_onclick(){
  var lanCode = $('#page-target-translate-language').val();
  var url = document.location;
  window.location = 'http://translate.google.com/translate?tl='+lanCode+'&u='+url;
}

/**
 * tranlate the content
 */
function content_translate_onclick(){
    var lanCode = $('#content-target-translate-language').val();
    eraseCookie('lanCode'); 
    createCookie('lanCode',lanCode,30);
    //copy the original content to translate content
    var t_content = document.getElementById('translate-content');
    var o_content = document.getElementById('original-content');
    t_content.innerHTML = o_content.innerHTML;
    var list = new Array();
    list.push(t_content);
    translate_elements('',lanCode,list);
}
/**
 * Show original content
 */
function content_original_onclick(){
    var t_content = document.getElementById('translate-content');
    var o_content = document.getElementById('original-content');
    t_content.innerHTML = o_content.innerHTML;
    $('#translated-text-area').css('display','none');
}

