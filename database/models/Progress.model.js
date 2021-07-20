const { Schema, model, Types } = require('mongoose');
const { databaseTables: { ACNIEVEMENTS, PROGRESS } } = require('../../constants');

const ProgressSchema = new Schema(
    {
        point: {
            type: Number,
            default: 0
        },
        maxPoints: {
            type: Number,
            default: 10
        },
        achievementId: {
            type: Types.ObjectId,
            ref: ACNIEVEMENTS,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = model(PROGRESS, ProgressSchema);