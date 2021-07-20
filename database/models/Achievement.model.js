const { databaseTables: { ACNIEVEMENTS, PROGRESS } } = require('../../constants');
const { Schema, model, Types } = require('mongoose');

const AchievementSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        progress: {
            type: Types.ObjectId,
            ref: PROGRESS
        }
    },
    { timestamps: true }
);

AchievementSchema.pre('find', _preHook);
AchievementSchema.pre('findOne', _preHook);
AchievementSchema.pre('findById', _preHook);

function _preHook() {
    this.populate('progress');
}

module.exports = model(ACNIEVEMENTS, AchievementSchema);