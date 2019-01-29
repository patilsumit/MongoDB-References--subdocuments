const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/courses-subdoc')
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  });

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema //Sub document with its own schema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// listCourses();

// createCourse('Java Course', new Author({
//   name: "Mubeen",
//   bio: "My bio",
//   website: "webstackacademy.com" }));

async function updateAuthor(courseId){
    const course = await Course.findById(courseId);
    course.author.name = 'Sumit';
    const result = await course.save();
    console.log(result);
}
//createAuthor('Jayakumar', 'My bio', 'My Website');

updateAuthor('5c4eb703fe57e71e34ede24e');

//createCourse('Node Course', '5b51aecb763076622a1d23ef');


//listCourses();

// async function createAuthor(name, bio, website) { 
//   const author = new Author({
//     name, 
//     bio, 
//     website 
//   });

//   const result = await author.save();
//   console.log(result);
// }