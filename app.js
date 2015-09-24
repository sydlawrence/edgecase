var api = require('./api');

var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'UTF-8' );

var waiting = false;
var typed = '';

var sendTest = function() {
  console.log('RUNNING TESTS on ' + typed);
  var isHTTPS = false;
  api.test(typed, isHTTPS, function(d) {
    console.log(d);
    console.log('COMPLETED TESTS');
    typed = '';
  });
};


var displayString = function() {
  process.stdout.write( typed + '\n' );
}

// on any data into stdin
stdin.on( 'data', function( key ){

  if( key.charCodeAt(0) === 127 ){
    typed = typed.substring(0, typed.length - 1);
    displayString();
    return;
  }

  // ctrl-c ( end of text )
  if (key === "\u000d") {
    sendTest();
    return;
  }
  if ( key === '\u0003' ) {
    process.exit();
    return;
  }

  typed += key;
  displayString();

});
