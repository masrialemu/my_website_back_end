const express = require('express');
const mongo = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true, // Enable cookies and authentication headers
}));

// Import routes
const Portfolio = require('./Router/PostPortfolio');
const getPortfolio = require('./Router/GetPortfolio');
const Post = require('./Router/Post');
const Get = require('./Router/Get');
const Mail = require('./Router/Fead');
const Signup = require('./User/Register');
const Login = require('./User/Login');
const PostSkill = require('./Skill/PostSkill');
const GetSkill = require('./Skill/GetSkill');
const DeleteSkill = require('./Skill/DeleteSkill');
const PostInfo = require('./Info/PostInfo');
const GetInfo = require('./Info/GetInfo');
const DeleteInfo = require('./Info/DeleteInfo');
const DeletePortfolio = require('./Router/DeletePortfolio');
const Detail = require('./Router/GetDetail');
const GetContent = require('./Content/GetContent');
const EditContent = require('./Content/EditContent');
const PostContent = require('./Content/PostContent');
const DeleteContent = require('./Content/DeleteContent');
const Related = require('./Router/Related');
const SingleContent = require('./Content/ContentSingle');

// Connect to MongoDB
mongo.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB is connected'))
    .catch((err) => console.error('DB connection error:', err));

// Define routes
app.use('/get/info', GetInfo);
app.use('/post/info', PostInfo);
app.use('/delete/info', DeleteInfo);
app.use('/login', Login);
app.use('/signup', Signup);
app.use('/post/skill', PostSkill);
app.use('/get/skill', GetSkill);
app.use('/delete/skill', DeleteSkill);
app.use('/delete/portfolio', DeletePortfolio);
app.use('/post/portfolio', Portfolio);
app.use('/get/portfolio', getPortfolio);
app.use('/post', Post);
app.use('/get/content', SingleContent);
app.use('/get/content', GetContent);
app.use('/edit/content', EditContent);
app.use('/post/content', PostContent);
app.use('/delete/content', DeleteContent);
app.use('/get', Get);
app.use('/get/detail', Detail);
app.use('/related', Related);
app.use('/mail', Mail);

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});