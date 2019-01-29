const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/course-author-array')
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
  authors: [authorSchema] //Array of authors
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

// createCourse('Node Course', [
//   new Author({ name: "Mubeen" }),
//   new Author({ name: "Jayakumar" })
// ]);

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

listCourses();

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    const result = await course.save();
    console.log(result);
}

// addAuthor("5c4ffa89f62635163a6abf7f", 
//   new Author({ name: "Suprita" }));

// async function updateAuthor(courseId){
//   const course = await Course.update({_id: courseId }, {
//     $set: {
//       'author.name':'Jhon Smith'
//     }
//   });
// }

// async function updateAuthor(courseId){
//   const course = await Course.update({_id: courseId }, {
//     $unset: {
//       'author':''
//     }
//   });
// }

async function deleteAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId); // Get author by id
  author.remove();
  course.save();
}

// deleteAuthor('5c4ffa89f62635163a6abf7f','5c4ffa89f62635163a6abf7d')

// addAuthor("5b571b0de4e3cd3e4f5dc39f",new Author({ name: "Suprita" }))

// Write a function to update author. Change its name
// Pass 3 params courseId, authorId, author object


