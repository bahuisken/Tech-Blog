const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Homepage Route
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in,
      homeActive: true,
      dashActive: false,
      loginActive: false
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post by ID Route
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      homeActive: false,
      dashActive: false,
      loginActive: false
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard Route
// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
      homeActive: false,
      dashActive: true,
      loginActive: false
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit Post by ID Route
router.get('/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('edit', {
      ...post,
      logged_in: req.session.logged_in,
      homeActive: false,
      dashActive: false,
      loginActive: false
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// New Post
router.get('/new', async (req, res) => {
  try {
    res.render('new', {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      logged_in: req.session.logged_in,
      homeActive: false,
      dashActive: false,
      loginActive: false
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Login Route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', {
    homeActive: false,
    dashActive: false,
    loginActive: true
  });
});

module.exports = router;
