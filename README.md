# dartmouth-course-watch
A command-line script written using Phantom.js that parses the Dartmouth academic timetable to look up courses, with an emphasis on checking if there is space in the course, allowing students to enroll.

The script is easily extendible. At its simplest it provides users a quick lookup of course data (title, period, room, building, instructor, distributive requirements, enrollment limit and current enrollment). With some configuration (generating an free API key from [Mandrill](http://mandrill.com/)), you can have it email upon detecting enrollment opportunities.

## Installation
dartmouth-course-watch requires [PhantomJS](http://phantomjs.org/). Install and make sure the binary is in your path.

Afterwards, clone the repository and test it out!
```sh
 git clone https://github.com/cheniel/dartmouth-course-watch.git
 cd dartmouth-course-watch
 phantomjs checkClass.js [DEPARMENT] [COURSE NUMBER]
```

## Usage / Use Cases

### Look up course information
Usage   `phantomjs checkClass.js [DEPARMENT] [COURSE NUMBER]`

Example `phantomjs checkClass.js cosc 1`


### Continuous lookup of course information

### Send email notification when there is space in the class

### Other Use Cases



