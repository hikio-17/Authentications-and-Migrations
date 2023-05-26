const { User } = require('../models');

module.exports = (app) => {
  app.get('/api/post', async (req, res) => {
    const newUser = await User.create({ id: 1, username: 'Hikma' });
    await newUser.createPost({
      id: 1,
      title: 'Title 1',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem assumenda doloribus iusto itaque magni et, eius soluta iure fugit neque est cupiditate harum, ea aut, pariatur eos dolorum! Architecto?',
    });

    await newUser.createPost({
      id: 2,
      title: 'Title 2',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem assumenda doloribus iusto itaque magni et, eius soluta iure fugit neque est cupiditate harum, ea aut, pariatur eos dolorum! Architecto?',
    });

    const posts = await newUser.getPosts();

    res.send(posts);
  });
};