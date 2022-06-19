const express = require('express');
const cors = require('cors');


require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vvlbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);

async function run() {
    try {
      await client.connect();
     
      const skillsCollection = client.db('ToDoList').collection('skills')
      const languageCollection = client.db('LearnSchool').collection('LanguageLearning')
      const recruitCollection = client.db('LearnSchool').collection('JobRecruitment')
      const admissionCollection = client.db('LearnSchool').collection('UniversityAdmission')
      console.log('Connected');
  
     
  
      
      app.get('/skills',  async (req, res) => {
        const skills = await skillsCollection.find().toArray();
        res.send(skills);
      })
      app.get('/courses',  async (req, res) => {
        const courses = await languageCollection.find().toArray();
        res.send(courses);
      })
      app.get('/recruitment',  async (req, res) => {
        const recruitment = await recruitCollection.find().toArray();
        res.send(recruitment);
      })
      app.get('/admission',  async (req, res) => {
        const admission = await admissionCollection.find().toArray();
        res.send(admission);
      })

  
    }
    finally { }
  }
  run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })