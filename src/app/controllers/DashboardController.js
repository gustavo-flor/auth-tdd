const { User } = require('../models');

class DashboardController {
    async show(request, response) {
        return response.status(200).send();
    }
}

module.exports = new DashboardController();