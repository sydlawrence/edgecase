var exec = require('child_process').exec;
var api = require('./modules/api');
var sounds = require('./modules/sounds');
var printer = require('./print');
var stdin = process.stdin;

var shouldUpdateSwitchState = true;



var pythonExec = function(str, arg) {
  var cmd = 'sudo python ' + __dirname + '/' + str + '.py "' + arg + '"';
  exec(cmd, function(error, stdout, stderr) {
    process.stdout.write(stdout);
  });
};

pythonExec('lights', 0);

var displayOnScreen = function(str) {
  if (str.length > 40) {
    str = str.substring(0, 39);
  }
  pythonExec('screen', str);
  process.stdout.write( str + '\n' );
};

var allSwitchesPrimed = false;

var switchesChanged = function() {

}

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'UTF-8' );

var waiting = false;
var waitingForInput = true;
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
    case 'edge':
      err += 'There is an issue with this website that could force an old document mode intended for older versions of Internet Explorer. We suggest you develop one code base for all modern browsers including Microsoft Edge and implement feature detection for older browsers.\n';
      break;
    case 'markup':
      err += 'All browsers should see the same markup.\n';
      break;
    case 'pluginfree':
      err += 'You are using outdated plugins. We would recommended using cross browser HTML5 code rather than than plugins.\n';
      break;
    default:
      err = JSON.stringify(test.data);
  }
  return err;
  return test.data;
};

var toPrint = '';
var state = 'waiting';
var error = false;
var passed = 0;
var sendTest = function() {
  toPrint = '';
  toPrint = '\n\n' + typed + ' test results:';
  error = '';
  passed = 0;
  var isHTTPS = false;
  if (typed.toLowerCase() === 'microsoft.com') {
    displayOnScreen('You cheeky scoundrel');
    setTimeout(function() {
      resetTests();
    }, 5000);
    return;
  }
  if (typed.toLowerCase() === 'hello') {
    displayOnScreen('Is it me you are looking for');
    setTimeout(function() {
      resetTests();
    }, 5000);
    return;
  }
  
   if (typed.toLowerCase() === 'modem') {
    displayOnScreen('modem');
    sounds.playModem();
    setTimeout(function() {
      resetTests();
    }, 5000);
    return;
  }
  
  
  
    if (typed.toLowerCase() === 'apple.com') {
    displayOnScreen('I do not like fruit');
    setTimeout(function() {
      resetTests();
    }, 5000);
    return;
  }
  if (typed.toLowerCase() === 'help') {
    displayOnScreen('It\'s simple, just enter a domain');
    setTimeout(function() {
      resetTests();
    }, 5000);
    return;
  }
  if (typed.toLowerCase() === 'rick astley' || typed.toLowerCase() === 'rickastley') {
    displayOnScreen('Never gonna give you up');
    setTimeout(function() {
      displayOnScreen('Never gonna let you down');
    }, 2500);
    setTimeout(function() {
      displayOnScreen('Never gonna run around and desert you');
    }, 5000);
    setTimeout(function() {
      displayOnScreen('Never gonna make you cry');
    }, 7500);
    setTimeout(function() {
      displayOnScreen('Never gonna say goodbye');
    }, 10000);
    setTimeout(function() {
      displayOnScreen('Never gonna tell a lie and hurt you');
    }, 12500);
    setTimeout(function() {
      resetTests();
    }, 15000);
    return;
  }
  if (typed.toLowerCase() === 'wemakeawesomesh.it') {
    displayOnScreen('They made me');
    setTimeout(function() {
      displayOnScreen('They are awesome');
    }, 2500);
    setTimeout(function() {
      resetTests();
    }, 5000);
    return;
  }
  
    if (typed.toLowerCase() === 'code.visualstudio.com') {
    displayOnScreen('That is awesome');
    setTimeout(function() {
      displayOnScreen('Ask Giles');
    }, 2500);
    setTimeout(function() {
      resetTests();
    }, 5000);
    return;
  }

  if (typed.toLowerCase() === 'hal') {
    displayOnScreen('I\'m sorry Dave.')
    setTimeout(function() {
      displayOnScreen('I\'m afraid I can\'t do that');
    }, 2500);
    setTimeout(function() {
      resetTests();
    }, 5000);
    return;
  }
  if (typed.toLowerCase() === 'pornhub.com') {
    displayOnScreen('Initialising')
    setTimeout(function() {
      displayOnScreen('You sick puppy');
    }, 1500);
    setTimeout(function() {
      resetTests();
    }, 4000);
    return;
  }
  waitingForInput = false;
  api.test(typed, isHTTPS, function(d, isError) {
    if (isError) {
      error = '404 internet not found';
      displayOnScreen(error);
      setTimeout(function() {
        waitingForInput = true;
        resetTests();
      }, 5000);
      return;
    }
    if (d.message) {
      error = '404 site not found';
      displayOnScreen(error);
      setTimeout(function() {
        waitingForInput = true;
        resetTests();
      }, 5000);
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

  switchesChanged = function() {
    if (allSwitchesPrimed) {
      startInitSequence();
      switchesChanged = function(){};
    }
  };
  return true;
};

startInitSequence = function() {
  displayOnScreen('Initialising');
  displayOnScreen('Modem Connecting');
   sounds.playModem();
 
  pythonExec('lights', 1);
  pythonExec('smoke', 10);

  pythonExec('animateleds', 4);
  
  

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
    pythonExec('lights', 0);
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
    setTimeout(function() {
      resetTests();
    }, 10000);
  }, 20000);
  return true;
};

// typed = 'nfb.ca';
// sendTest();

var resetTests = function() {
  typed = '';
  if (waitingForInput) {
    displayOnScreen('Hello. I\'m MicrosoftEdge Case! Begin...');
  }
  else {
    switchesChanged = function() {
      waitingForInput = true;
      displayOnScreen('Hello. I\'m MicrosoftEdge Case! Begin...');
      switchesChanged = function(){};
    };
  }
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

  // console.log(encodeURIComponent(key));
  // ctrl-c ( end of text )
  if (key === "\u0011") {
    var cmd = 'sudo halt';
    displayOnScreen('Shutting down');
    exec(cmd, function(error, stdout, stderr) {
      process.stdout.write(stdout);
    });
    return;
  }
  if (key === "\u000d") {
    var prep = sendTest();
    if (prep) {
      displayOnScreen('Prepare init sequence');
    }
    return;
  }
  if ( key === '\u0003' ) {
    process.exit();
    return;
  }

  if (typed.length >= 40 || key === '#') {
    return;
  }

  typed += key;
  displayString();
});

resetTests();

setInterval(function() {
  if (shouldUpdateSwitchState) {
     var cmd = 'sudo python ' + __dirname + '/switches.py';
     exec(cmd, function(error, stdout, stderr) {
     });
  }

  var cmd = 'sudo python ' + __dirname + '/checkswitches.py';
  exec(cmd, function(error, stdout, stderr) {
       stdout = stdout.replace(/^\s+|\s+$/g, '').trim();

	console.log(stdout);
    var newSwitches = false;
    if (stdout === "False") {
      newSwitches = false;
     console.log('all down');
    }
    else if (stdout === "True") {
      newSwitches = true;
console.log('all up');
    }
    else {
      return;
    }
    if (newSwitches !== allSwitchesPrimed) {
      allSwitchesPrimed = newSwitches;
      switchesChanged();
    }
  });
}, 200);

