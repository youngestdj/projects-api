import express from 'express';

const router = express.Router();
router.route('/test').get((req, res) => {
  return res.status(200).json({
    message: 'Everything is ok',
  });
});
// router.use('/v1');
export default router;
