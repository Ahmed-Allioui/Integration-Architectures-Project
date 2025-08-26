const {SocialPerformance} = require('../../src/dto/socialPerformance');

exports.asSingle = () => {
    return createSocialPerformance();
}

exports.asArray = () => {
    return [createSocialPerformance()];
}

const createSocialPerformance = () => {
    let socialPerformance = new SocialPerformance();
    socialPerformance.goalDescription = "Social skills"
    socialPerformance.actualValue = 4;
    socialPerformance.targetValue = 4;
    return socialPerformance;
}