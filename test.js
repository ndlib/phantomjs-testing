var url = 'http://localhost:3000'
var useWaitTime = true
var waitTime = 5000
var output = 'images/capture_' + Date.now() + '.png'


var page = require('webpage').create()
page.viewportSize = { width: 1024, height: 2048 }
page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")')
};
page.onError = function(msg, trace) {
  var msgStack = ['ERROR: ' + msg]
  if (trace && trace.length) {
    msgStack.push('TRACE:')
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''))
    });
  }
  console.error(msgStack.join('\n'))
};
page.onResourceError = function(resourceError) {
  console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')')
  console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString)
};
page.open(url, function() {
  if(useWaitTime) {
    window.setTimeout(function () {
      page.render(output)
      phantom.exit()
    }, 5000)
  } else {
    page.render(output)
    phantom.exit()
  }


});
