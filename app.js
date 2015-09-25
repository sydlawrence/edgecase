var exec = require('child_process').exec;
var api = require('./modules/api');
var printer = require('./print');
var stdin = process.stdin;

var pythonExec = function(str, arg) {
  var cmd = 'sudo python ' + __dirname + '/' + str + '.py "' + arg + '"';
  exec(cmd, function(error, stdout, stderr) {
    process.stdout.write(stdout);
  });
};

var displayOnScreen = function(str) {
  if (str.length > 40) {
    str = str.substring(0, 39);
  }
  pythonExec('screen', str);
  process.stdout.write( str + '\n' );
};



// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'UTF-8' );

var waiting = false;
var typed = '';

var formatTestFail = function(test) {
  var err = '';
  switch(test.testName) {
    case 'browserDetection':
      err += 'You are checking user agents.\n';
      for (var i in test.data) {
        if (! test.data[i].passed) {
          for (var j in test.data[i].data) {
            if (! test.data[i].data[j].passed) {
              if (i === 'comments') {
                err += 'You are using browser specific comments on line ' + test.data[i].data.lineNumber + '\n';
              }
              else {
                err += i + ': ' + test.data[i].data[j].url + ' line:' + test.data[i].data[j].lineNumber + ' ' + test.data[i].data[j].pattern + '\n';
              }
            }
          }
        }
      }
      break;
    case 'cssprefixes':
      err += 'You are not using standard css properties.\n';
      for (var i in test.data) {
        for (var j in test.data[i].selectors) {
          err += test.data[i].cssFile + ' line:' +test.data[i].selectors[j].lineNumber + ' ' + test.data[i].selectors[j].selector + ': ' + test.data[i].selectors[j].styles.join(', ') + '\n';
        }
      }
      break;
    case 'jslibs':
      err += 'You should keep your javascript libraries updated.\n';
      for (var i in test.data) {
        if (test.data[i].needsUpdate) {
          err += test.data[i].name + ' is currently using version ' + test.data[i].version + ', you should update it to at least ' + test.data[i].minVersion + '\n';
        }

      }
      break;
    default:
      err = JSON.stringify(test.data);
  }
  return err;
  return test.data;
};

var toPrint = '';
var error = false;
var passed = 0;
var sendTest = function() {
  toPrint = '';
  error = '';
  passed = 0;
  var isHTTPS = false;
  api.test(typed, isHTTPS, function(d, isError) {
    if (isError) {
      error = '404 internet not found';
      displayOnScreen(error);
      typed = '';
      return;
    }
    if (d.message) {
      error = '404 site not found';
      displayOnScreen(error);
      typed = '';
      return;
    }
    // console.log(d);
    var iterator = 1;
    for (var i in d.results) {
      if (d.results[i].passed) {
        passed++;
        toPrint += '\n\nTEST ' + iterator + ' PASSED (' + i + ')\n';
      }
      else {
        toPrint += '\n\nTEST ' + iterator + ' FAILED (' + i + ')\n';
        toPrint += formatTestFail(d.results[i]);
      }
      iterator++;
    }

    typed = '';
  });
  startInitSequence();
};

startInitSequence = function() {
  displayOnScreen('Initialising');
  pythonExec('smoke', 10);

  setTimeout(function() {
    if (!error) {
      displayOnScreen('Beep.');
    }
  }, 4000);

  setTimeout(function() {
    if (!error) {
      displayOnScreen('Beep. Burp.');
    }
  }, 8000);

  setTimeout(function() {
    if (!error) {
      displayOnScreen('Beep. Burp. Beep beep.');
    }
  }, 12000);

  setTimeout(function() {
    if (!error) {
      displayOnScreen('Processing');
    }
  }, 16000);

  setTimeout(function() {
    if (!error) {
      displayOnScreen('Processing.');
    }
  }, 17000);

  setTimeout(function() {
    if (!error) {
      displayOnScreen('Processing..');
    }
  }, 18000);

  setTimeout(function() {
    if (!error) {
      displayOnScreen('Processing...');
    }
  }, 19000);

  setTimeout(function() {
    if (error) {
      return;
    }
    printer.print(toPrint);
    var msg = 'Could do better';
    if (passed === 6) {
      msg = 'Perfecto';
    }
    if (passed === 5) {
      msg = 'So close';
    }
    if (passed < 3) {
      msg = 'Down right awful';
    }
    displayOnScreen('Passed ' + passed + '/6 tests    ' + msg);
    if (passed === 6) {
      setTimeout(function() {
        displayOnScreen('Everything is 200 OK');
      }, 2000);
    }
  }, 20000);
};

// typed = 'nfb.ca';
// sendTest();

var resetTests = function() {
  typed = '';
  displayOnScreen('Hello... I am Admiral Edge Case! Begin');
}

var displayString = function() {
  displayOnScreen( typed );
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
    displayOnScreen('Prepare init sequence');
    return;
  }
  if ( key === '\u0003' ) {
    process.exit();
    return;
  }

  pythonExec('lights', 127);
  setTimeout(function() {
    pythonExec('lights', 0);
  }, 500);
  if (typed.length >= 40) {
    return;
  }
  typed += key;
  displayString();
});

resetTests();

pythonExec('lights', 127);
setTimeout(function() {
  pythonExec('lights', 0);
}, 3000);

