const { models: { AchievementModel, ProgressModel } } = require('../database');
const { databaseTables: { PROGRESS }, statusCodes: { CREATED, UPDATED } } = require('../constants');
const { progressDto, singleAchievementDto } = require('../dtos');
const { ErrorHandler } = require('../errors');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const achievements = await AchievementModel.find().populate('progress');

            const response = achievements.map((a) => new singleAchievementDto(a));

            res.json(response);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { achievement } = req;

            const response = new singleAchievementDto(achievement)

            res.json(response);
        } catch (e) {
            next(e);
        }
    },

    getProgress: async (req, res, next) => {
        try {
            const { achievement } = req;

            const progress = new progressDto(achievement.progress);

            res.json(progress);
        } catch (e) {
            next(e);
        }
    },

    addNewAchievement: async (req, res, next) => {
        try {
            const { body: { title, maxPoints } } = req;

            const achievement = await AchievementModel.create({ title });

            const { id } = achievement;
            const { id: progressId } = await ProgressModel.create({ maxPoints, achievementId: id });

            achievement.progress = progressId;
            await achievement.save();

            res.status(CREATED).json({ achievement });
        } catch (e) {
            next(e);
        }
    },

    setProgress: async (req, res, next) => {
        try {
            const { achievement: { progress: { _id, maxPoints } }, body: { newPoint } } = req;

            const progress = await ProgressModel.findOne({ _id });

            progress.point = +newPoint;
            await progress.save();

            res.status(UPDATED).json({ newPoint });
        } catch (e) {
            next(e);
        }
    },
}