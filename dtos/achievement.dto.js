const progressDto = require('./progress.dto');

class AchievementDto {
    constructor(object) {
        this.id = object._id.toString();
        this.title = object.title;
        this.progress = new progressDto(object.progress);
        this.createdAt = object.createdAt;
    }
}

module.exports = AchievementDto;