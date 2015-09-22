/*
 * Dartmouth Course Checker
 *
 * Displays Dartmouth course data, including enrollment. Easily extendible to
 * provide email notification on course availability detection.
 *
 * Return values:
 *   0 if class has room
 *   1 if class is full
 *  -1 if the program has an error
 *
 * Usage:   phantomjs checkClass.js [DEPARMENT] [COURSE NUMBER]
 * Example: phantomjs checkClass.js EARS 6
 *
 * Created by Daniel Chen '16
 * Github: cheniel
 */

// called when the class has space. Fill this out if you like!
// send an email, modify a database, etc...
function classHasSpaceHandler(results, page) {

  // // MANDRILL EMAIL TEMPLATE
  // // If you would like to have an email sent when course availabilities is
  // // detected, uncomment the code below, register for a free account, and
  // // fill in YOUR_API_KEY, YOUR@EMAIL.HERE, and RECIPIENT@EMAIL.HERE
  // page.evaluate(function(title, enrl, lim) {
  //   console.log("sending email");
  //   $.ajax({
  //     async: false,
  //     type: 'POST',
  //     url: 'https://mandrillapp.com/api/1.0/messages/send.json',
  //     data: {
  //       'key': 'YOUR_API_KEY',
  //       'message': {
  //         'from_email': 'YOUR@EMAIL.HERE',
  //         'to': [
  //             {
  //               'email': 'RECIPIENT@EMAIL.HERE',
  //               'type': 'to'
  //             }
  //           ],
  //         'autotext': 'true',
  //         'subject': 'Sign up for ' + title + ' now!!',
  //         'html': 'The time has come! The capacity is ' + enrl + '/' + lim + ". <a href='http://www.dartmouth.edu/bannerstudent/'>Banner.</a>"
  //       }
  //     }
  //   }).done(function(response) {
  //     console.log("response: " + response);
  //   });
  // }, results.title, results.enrl, results.lim);
  // console.log("finished");

}

// constants
var NUM_DATA_POINTS = 17,
    SERVER = 'https://banner.dartmouth.edu/dart/groucho/timetable.course_quicksearch',
    JQUERY = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';

// get command line args
var system = require('system');
var args = system.args;

// terminate if no arguments
if (args.length !== 3) {
  console.log("Usage:   phantomjs" + args[0] + " [DEPARMENT] [COURSE NUMBER]");
  console.log("Example: phantomjs" + args[0] + " EARS 6");
  phantom.exit(-1);
}

var page = require('webpage').create(),
    data = 'classyear=2008&subj=' + args[1] + '&crsenum=' + args[2];

// ERROR HANDLERS
phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  phantom.exit(-1);
};

page.onError = function(msg, trace) {
  var msgStack = ['ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }
  console.error(msgStack.join('\n'));
};

// // Uncomment if you would like to see console.log() messages from inside
// // page.evaluate(function() {...})
// page.onConsoleMessage = function(msg) {
//   console.log(msg);
// };

page.open(SERVER, 'post', data, function(status) {

  if (status !== 'success') {
    console.log('Unable to post!');
    phantom.exit(-1);
  }

  // include jquery
  page.includeJs(JQUERY, function() {

    var results = [];
    for (var i = 0; i < NUM_DATA_POINTS; i++) {

      // get data type from header row
      var key = page.evaluate(function(idx) {
        var tableRows = $(".data-table > table > tbody > tr");
        return tableRows.eq(0).children("th").eq(idx).text().toLowerCase();
      }, i);

      // get data from data row
      var data = page.evaluate(function(idx) {
        var tableRows = $(".data-table > table > tbody > tr");
        return tableRows.eq(2).children("td").eq(idx).text();
      }, i);

      results[key] = data;
    }

    // print data
    console.log("Course Information:");
    for(var dataType in results) {
      console.log(dataType + ": " + results[dataType]);
    }

    // check if class has space
    if (parseInt(results.lim) > parseInt(results.enrl)) {
      console.log("\nTHERE IS ROOM IN THE CLASS!!! " + results.enrl
          + "/" + results.lim);
      classHasSpaceHandler(results, page);
      phantom.exit(0);
    } else {
      console.log("\nThe class is full. " + results.enrl + "/" + results.lim);
      phantom.exit(1);
    }

  });
});
