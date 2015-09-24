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
// on any data into stdin
stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  }
  if (key.indexOf('P') > -1) {
    waiting = false;
    process.stdout.write('Alice, who the fuck is alice\n');
  }
  else {
    typed += key;
    waiting = true;
    process.stdout.write( 'WAT: ' + typed + '\n' );
  }
  // write the key to stdout all normal like
  // process.stdout.write( key );
});
