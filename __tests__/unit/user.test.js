const bcrypt = require('bcryptjs');

const truncate = require('../utils/truncate');
const factory = require('../../src/database/factories');

describe('User', () => {
    beforeEach(async (done) => {
        await truncate();
        done();
    });

    it('should encrypt user password', async () => {
        const user = await factory.create('User', {
            password: 'test@369'
        });

        const isPasswordHashEqual = await bcrypt.compare('test@369', user.password_hash);

        expect(isPasswordHashEqual).toBe(true);
    });
});