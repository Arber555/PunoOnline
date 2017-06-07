$(function() {
            document.getElementById('delayMsg').innerHTML = 'Ju lutem prisni do te ridrejtoheni pas <span id="countDown">8</span> sekonda...';
            var count = 8;
            setInterval(function(){
                count--;
                document.getElementById('countDown').innerHTML = count;
                if (count == 0) {
                    window.location = 'login.html'; 
                }
            },1000);
        });