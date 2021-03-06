const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/courses-reference')
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author' // Refers to Author model
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author // ID of author document object
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    //.populate('author') // Fetch author reference document
    .populate('author', 'name bio -_id')
    .select('name author');
  console.log(courses);
}

//createAuthor('Mubeen', 'My bio', 'My Website');

//createCourse('Node Course', '5b6a95aa8a395f3652179521');

listCourses();
