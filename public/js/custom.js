document.addEventListener('DOMContentLoaded', function(){

    Typed.new("#typed", {
        stringsElement: document.getElementById('typed-strings'),
        typeSpeed: 30,
        backDelay: 500,
        loop: false,
        contentType: 'html', // or text
        // defaults to null for infinite loop
        loopCount: null,
        callback: function(){ foo(); },
        resetCallback: function() { newTyped(); }
    });

    var resetElement = document.querySelector('.reset');
    if(resetElement) {
        resetElement.addEventListener('click', function() {
            document.getElementById('typed')._typed.reset();
        });
    }

});

function newTyped(){ /* A new typed object */ }

function foo(){ console.log("Callback"); }

function textCounter(field,cnt, maxlimit) {
	var cntfield = document.getElementById(cnt)
     if (field.value.length > maxlimit) // if too long...trim it!
	    field.value = field.value.substring(0, maxlimit);
		// otherwise, update 'characters left' counter
		else
		cntfield.value = maxlimit - field.value.length;
}
