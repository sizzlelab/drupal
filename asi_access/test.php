<?php
    $app_name = 'sizzlelab';
    $app_password = 'Siar2Rx4TJb3';
    $url = 'http://cos.alpha.sizl.org/';
    $postfield = 'session[app_name]='.$app_name.'&session[app_password]='.$app_password;
    
    if($ch = curl_init()){
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
        curl_setopt($ch, CURLOPT_COOKIESESSION, TRUE); 
        curl_setopt($ch, CURLOPT_HEADER, 0); 
        curl_setopt($ch, CURLOPT_COOKIEFILE, "cookiefile"); 
        curl_setopt($ch, CURLOPT_COOKIEJAR, "cookiefile"); 
        curl_setopt($ch, CURLOPT_COOKIE, session_name() . '=' . session_id()); 
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
        $post_url = $url.'session';
        curl_setopt($ch, CURLOPT_URL,$post_url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST'); 
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postfield); 
        $data = curl_exec($ch);
        print $data;
        $get_url = $url.'people/dHZb2SU4er36mNaaWPEYjL/@self';
        curl_setopt($ch, CURLOPT_URL,$get_url);
        curl_setopt($ch,CURLOPT_CUSTOMREQUEST, 'GET');
        $data = curl_exec($ch);
        print $data;
        //$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        curl_close($ch);
        
    }else{
        print FALSE;   
    }
    //test the application account
    /*$ch = curl_init();
    curl_setopt($ch,CURLOPT_HEADER,0);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_POST,1);
    $postfield = 'session[app_name]='.$app_name.'&session[app_password]='.$app_password;
    curl_setopt($ch,CURLOPT_POSTFIELDS,$postfield);
    $data=curl_exec($ch);
    curl_close($ch);
    print $data;
    if($data){
        $result = json_decode($data);
        print_r($result);
        if(isset($result->messages)){
            print $result->messages[0];
        }else if(isset($result->entry)){
            print 'ok';
        }
    }else{
        print 'error';
    }*/


?>