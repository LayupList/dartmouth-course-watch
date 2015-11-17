# dartmouth-course-watch

![Example image](https://raw.githubusercontent.com/cheniel/dartmouth-course-watch/master/example.png)

A command-line script written using [PhantomJS](http://phantomjs.org/) that crawls the Dartmouth academic timetable and shows if there is space in a course.

The script is easily extendible. At its simplest it displays the current enrollment and limit info, producing a terminal beep if there is space. With some configuration (generating an free API key from [Mandrill](http://mandrill.com/)), you can have it email upon detecting enrollment opportunities.

## Installation
dartmouth-course-watch requires [PhantomJS](http://phantomjs.org/). Install and make sure the binary is in your path.

Afterwards, clone the repository and test it out!
```sh
 git clone https://github.com/cheniel/dartmouth-course-watch.git
 cd dartmouth-course-watch
 phantomjs check_class.js [DEPARMENT] [COURSE NUMBER]
```

## Extensions
To extend the script to perform additional actions when an opening in the class is detected, modify the `classHasSpaceHandler` in check_class.js.

If you would like to send an email notification, see "Send email notification when there is space in the class" for a simple solution.

## Usage / Use Cases

### Look up course information
Usage   `phantomjs check_class.js [DEPARMENT] [COURSE NUMBER]`

Example `phantomjs check_class.js cosc 1`

Example output:
```
4:20:35 PM EST | 114/180 | THERE IS ROOM IN THE CLASS!!!
```
or
```
4:21:56 PM EST | 180/180 | The class is full.
```

### Continuous lookup of course information
You can wrap the lookup in a bash loop to run the program continuously. This, combined with some extension in `classHasSpaceHandler` can allow you to receive real-time notifications when space opens up in a class. It'll also produce a terminal beep.

`while :; do phantomjs check_class.js [DEPARTMENT] [COURSE NUMBER]; sleep [AMOUNT OF TIME TO SLEEP]; done`

### Send email notification when there is space in the class
1. Uncomment the "MANDRILL EMAIL TEMPLATE" in `classHasSpaceHandler`
2. Create a free account and generate an API key from [Mandrill](http://mandrill.com/))
3. Replace `YOUR_API_KEY`, `YOUR@EMAIL.HERE`, `RECIPIENT@EMAIL.HERE`, with the API key, the FROM email and the TO email, respectively

### Other Use Cases
You can modify `classHasSpaceHandler` to do whatever you like. The commented-out example shows a method for sending email, but you could feasibly do things like send a text, write to a database, etc.
