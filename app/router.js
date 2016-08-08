import { Router } from 'express';
import * as Posts from './controllers/post-controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// example!
// on routes that end in /posts
// ----------------------------------------------------

router.route('/posts')
  .post(Posts.createPost)
  .get(Posts.getPosts);


router.route('/posts/:id')
  .put(Posts.updatePost)
  .get(Posts.getPost)
  .delete(Posts.deletePost);


export default router;
