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
  .post(/* someMethod*/ Posts.createPost(req, res))
  .get(/* someMethod*/ Posts.getPosts());


router.route('/posts/:id')
  .put(/* someMethod*/Posts.updatePost())
  .get(/* someMethod*/ Posts.getPost())
  .delete(/* someMethod*/Posts.deletePost());

// /your routes will go here

export default router;
