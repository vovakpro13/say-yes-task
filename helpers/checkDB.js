const { models: { AchievementModel, ProgressModel } } = require('../database');
const  { databaseTables: { ACNIEVEMENTS } } = require('../constants');

const achievements = [
    {
        achievement: {
            title: '10 посаженных саженцев капусты'
        } ,
        progress: { }
    },
    {
        achievement: {
            title: '10 посаженных саженцев моркови'
        } ,
        progress: { }
    },
    {
        achievement: {
            title: 'Расширение грядок до 15 ячеек'
        } ,
        progress: {
            maxPoints: 15
        }
    },
    {
        achievement: {
            title: 'За первую уборку урожая'
        } ,
        progress: {
            maxPoints: 1
        }
    },
    {
        achievement: {
            title: 'За первых 5 заходов в игру'
        } ,
        progress: {
            maxPoints: 5
        }
    }
]

module.exports = (async () => {
    const res = await AchievementModel.findOne();

    if (!res) {
        achievements.forEach(_createAchievement);
    }
})();

async function _createAchievement({ achievement, progress }) {
    const createdAchievement = await AchievementModel.create({ ...achievement });
    const createdProgress = await ProgressModel.create({
        ...progress,
        achievementId: createdAchievement._id
    });

    createdAchievement.progress = createdProgress._id;

    await createdAchievement.save();
}