        var tlangCode = 'zh-CN';
        var elist = new Array();
        google.load("language", "1");
        if(Drupal.jsEnabled)
        {
            $(document).ready(
                function(){
                    contentElement = document.getElementById("content-translation");
                    textContent = contentElement.textContent;
                    /*
                     * detect the content's language code
                     * if language is en(english), translate to zh(chinese)
                     * else translate to en
                    */
                    
                    if(textContent.length>500)
                        textContent = textContent.substring(0,450);
                    google.language.detect(textContent, function(result) {
                        // If there wasn't an error in the request
                        if (!result.error) {
                            //alert(result.language);
                            if(result.language!='en')
                            {
                                tlangCode = 'en';
                            }
                        }
                        translate_all_content(contentElement);
                    });
                }
            );
        }
        

        /**
         * translate the target content element
         */
        function translate_all_content(contentElement)
        {
            if(contentElement.innerHTML.length>500)
            {
                elist.push(contentElement);
                translate_elements();
            }else{
                translate_innerHTML(contentElement);
            }
        }
        /**
         * translate all elements in elist array
         */
        function translate_elements()
        {
            for(var n=0; n<elist.length;n++)
            {
                element = elist[n]; 
                cNodelist = element.childNodes;
                for(var i=0; i<cNodelist.length;i++)
                {
                    try{
                    cnode = cNodelist[i];
                    if(cnode.childNodes.length==0)
                    {
                        translate_value(cnode);
                    }else
                    {
                        if(cnode.innerHTML.length<500)
                        {
                            translate_innerHTML(cnode);
                        }else{
                            elist.push(cnode);
                        }
                    }
                    }catch(error){}
                }
            }
        }
        /**
         * translate node without chlidnode and textContent.length<500
         */
        function translate_value(cnode)
        {
            google.language.translate(cnode.textContent, '', tlangCode, function(result) {
                if (result.translation) {
                    cnode.textContent = result.translation;
                }
            });
        }
        /**
         * translate node's innerHTML value
         */
        function translate_innerHTML(cnode)
        {
            google.language.translate(cnode.innerHTML, '', tlangCode, function(result) {
                if (result.translation) {
                    cnode.innerHTML = result.translation;
                }
            });
        }