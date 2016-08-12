import Post from '../models/post-model';

const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags, content: post.content, author: post.author };
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.author = req.user._id;

  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};


export const getPosts = (req, res) => {
  Post.find()
  .then(posts => {
    res.json(cleanPosts(posts));
  })
  .catch(error => {
    res.json({ error });
  });
};


export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .populate('author')
  .then(post => {
    console.log(post);
    res.json(post);
  })
  .catch(error => {
    res.json({ error });
  });
};


export const deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.id)
  .then(result => {
    res.json({ message: 'Post deleted!' });
  })
  .catch(error => {
    res.json({ error });
  });
};


export const updatePost = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.tags) {
      post.tags = req.body.tags;
    }
    if (req.body.content) {
      post.content = req.body.content;
    }
    return post.save();
  })
  .then(post => {
    res.json(post);
  })
  .catch(error => {
    res.json({ error });
  });
};
