const Joi = require('joi');

module.exports = {
    updateProgressBody: (maxPointValue) => Joi.object().keys({
        newPoint: Joi.number().min(0).max(maxPointValue).required()
    }),

    createAchievementBody: Joi.object().keys({
        title: Joi.string().max(250).required(),
        maxPoints: Joi.number().min(1)
    })
}