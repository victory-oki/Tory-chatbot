$(function(){
    var named,
        toryResponse  = ["hello " + getName() + " ! i'm tory. nice to meet you,\n how old are you?",
            "hmmmm that means you were born  "+ calcAge() + ", how cool",
            " well if you don't already know by now, i'm a chatbot! which leads to my next question. Are you a programmer?",
            "oh that's great,i'm super thrilled to meet you :) do you think you could make me even smarter?","oh it's alright, but i would really recommend that you learn how to code"],
        chatRow = $('.chat-row'),
        body=document.getElementById('chat-box'),
        send = $('.send'),
        userInput = $('#user-input'),
        age,
        defaultText = "you have made an input of which i can't yet comprehend pls insert valid input",
        positive = ['yes','yeah','sure'],
        stage = 0;

    /**************
    * USER INPUT *
    *************/
    send.click(function () {
      update();
      scrollToBottom();
      console.log("i was clicked");
    });

    userInput.keyup(function (e) {
        if (e.keyCode !== 13){
            return false;
        }

        update();
        scrollToBottom();
    });

    /****************
     *CHAT TEMPLATE *
     ***************/

    function userReply(reply){
        return '<div class="user-reply-parent">'+
            '<div class="user-message">'+
            '<p class="left">' + reply+'</p>'+
            '</div>'+
            '</div>'
    }

    function toryReply(reply){
        return   '<div class="tory-message">'+
            '<p>'+ reply+'</p>'+
            '</div><br>'
    }

    function loader(){
        return '<div class="tory-message dot-wrapper-parent">'+
                    '<div class="dot-wrapper">'+
                        '<div class="dot-holder"><div class="dot one"></div></div>'+
                        '<div class="dot-holder"><div class="dot two"></div></div>'+
                        '<div class="dot-holder"><div class="dot three"></div></div>'+
                    '</div>'+
                '</div><br>'
    }

    /***********
     *UPDATE CHAT*
     ***********/
    function update()  {

        if (stage === 0){
            setName();
            setToryResponse();
        }
        else if (stage === 1){
            if(isNaN(parseInt($('#user-input').val()))){
                stage= stage-1;
            } else {
                setToryResponse();
            }
        }
        else if (stage === 3){
            console.log(positive["yes"]);
            if(positive[userInput.val().split()[0]] > -1){

            }
            else{
                stage ++;
            }
        }

        let content = userInput.val().trim();

        if (content.length < 1) {
            return false;
        }

        chatRow.append(userReply(content));
        userInput.val("");
        userInput.focus();
        stage++;
        convo();
    }

    /***********************
     * TORY REPLY FUNCTIONS*
     ***********************/
    function convo() {

        switch (stage){
            case 1:
                loaderTimeout(stage-1);
                break;
            case 2:
                console.log(stage);
                loaderTimeout(stage-1);
                break;
            case 3:
                loaderTimeout(stage-1);
                break;
            case 4:
                loaderTimeout(stage-1);
                break;
            case 5:
                loaderTimeout(stage-1);
                break;

            default:

        }
    }

    function loaderTimeout(a){
        if(typeof (toryResponse[a].length) === "number"){
            var speech = toryResponse[a].length;
            var timer = speech * 50;
            document.getElementById('user-input').disabled=true;
            chatRow.append(loader());
            scrollToBottom();
            setTimeout(function () {
                $('.dot-wrapper-parent').remove();
                chatRow.append(toryReply(toryResponse[a]));
                document.getElementById('user-input').disabled=false;
                scrollToBottom();
                if(stage===2){
                    stage++;
                    convo();
                }
            },timer);
        }
    }

    /***************
     *CONVO HELPERS*
     ***************/
    function getName() {
        return named;
    }

    function setName() {
        named = $('#user-input').val().split(" ")[0];
    }

    function calcAge() {
        console.log("im here");
        var d = new Date().getFullYear();
        var ans = d - $('#user-input').val();
        console.log(typeof ans);
        age = typeof(ans)=== "number" ? ans : "you have put in an invalid age";
        return age;
    }

    function setToryResponse () {
        toryResponse  = ["hello " + getName() + " ! i'm tory. nice to meet you,\n how old are you?",
            "hmmmm that means you were born  "+ calcAge() + ", how cool",
            " well if you don't already know by now, i'm a chatbot! which leads to my next question. Are you a programmer?",
            "oh that's great,i'm super thrilled to meet you :) do you think you could make me even smarter?",
            "oh it's alright, but i would really recommend that you learn how to code"]
    }

    function scrollToBottom(){
        body.scrollTop = body.scrollHeight;
    }

});