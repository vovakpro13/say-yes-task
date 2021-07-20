const { models: { AchievementModel } } = require('../database');
const { ErrorHandler } = require('../errors');
const { echievementsValidator: { updateProgressBody, createAchievementBody } } = require('../validators');

module.exports = {
    chekAchievement: async (req, res, next) => {
        try {
            const { id } = req.params;

            const achievement = await AchievementModel.findById(id);

            if (!achievement) {
                ErrorHandler.throwNotFound();
            }

            req.achievement = achievement;

            next();
        } catch (err) {
            next(err);
        }
    },

    chekNewProgressBody: async (req, res, next) => {
        try {
            const { body,  achievement: { progress: { maxPoints } } } = req;

            await _chekValid(updateProgressBody(maxPoints), body)

            next();
        } catch (err) {
            next(err);
        }
    },

    chekNewAchievementBody: async (req, res, next) => {
        try {
            const { body } = req;

            await _chekValid(createAchievementBody, body);

            next();
        } catch (err) {
            next(err);
        }
    },
}

async function _chekValid(validator, object) {
    const { error } = await validator.validate(object);

    if (error){
        ErrorHandler.throwBadRequest(error.details[0].message);
    }
}