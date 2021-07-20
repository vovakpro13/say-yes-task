const router = require('express').Router();

const { achievementsMiddleware } = require('../middlewares');
const { achievementsController } = require('../controllers');

router
    .get('/', achievementsController.getAll)
    .post('/',
        achievementsMiddleware.chekNewAchievementBody,
        achievementsController.addNewAchievement);

router
    .use('/:id', achievementsMiddleware.chekAchievement)
    .get('/:id', achievementsController.getById)
    .get('/:id/progress', achievementsController.getProgress)
    .put('/:id',
        achievementsMiddleware.chekNewProgressBody,
        achievementsController.setProgress);
module.exports = router;