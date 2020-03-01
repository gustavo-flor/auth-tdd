const { sequelize } = require('../../src/app/models');

module.exports = () => {
    return Promise.all(Object.values(sequelize.models).map(model => {
        return model.destroy({
            truncate: true,
            force: true
        });
    }));
}