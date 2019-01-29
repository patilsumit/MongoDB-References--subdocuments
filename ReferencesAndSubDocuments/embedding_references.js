const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/courses-reference')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  // add author properties
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(course);
}
async function createAuthor(authorObj) {
  const author = new Author(authorObj); 
  
  const result = await author.save();
  console.log(result);
}

// createAuthor(({name:'Mubeen',bio:"biodata" ,website: "sumitpatil.net"}));
// createCourse('C++ Programming','5c4ff6f263dd7d14df0db886');

async function listCourses() { 
  const courses = await Course.find()
  .populate('author','name bio -_id');
  console.log(courses);
}

//createCourse('MongoDB Course', new Author({ name: 'Mubeen' }));
listCourses();
