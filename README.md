# dartmouth-course-watch
A command-line script written using Phantom.js that parses the Dartmouth academic timetable to look up courses, with an emphasis on checking if there is space in the course, allowing students to enroll.

The script is easily extendible. At its simplest it provides users a quick lookup of course data (title, period, room, building, instructor, distributive requirements, enrollment limit and current enrollment). With some configuration (generating an free API key from Mandrill), you can have it email upon detecting enrollment opportunities.