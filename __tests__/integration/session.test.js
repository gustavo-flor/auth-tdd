const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../../src/database/factories');

describe('Authentication', () => {
    beforeEach(async (done) => {
        await truncate();
        done();
    });

    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User');

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: user.password
            });

        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid email', async () => {
        const user = await factory.create('User', {
            email: 'test@mail.com'
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: 'test@com.mail',
                password: user.password
            });

        expect(response.status).toBe(401);
    });

    it('should not authenticate with invalid password', async () => {
        const user = await factory.create('User', {
            password: 'test@123'
        });

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: 'test@321'
            });

        expect(response.status).toBe(401);
    });

    it('should return jwt token when authenticated', async () => {
        const user = await factory.create('User');

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: user.password
            });

        expect(response.body).toHaveProperty('token');
    });

    it('should be able to access private routes when authenticated', async () => {
        const user = await factory.create('User');

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should not be able to access private routes without jwt token', async () => {
        const user = await factory.create('User');

        const response = await request(app)
            .get('/dashboard');

        expect(response.status).toBe(401);
    });

    it('should not be able to access private routes with invalid jwt token', async () => {
        const user = await factory.create('User');

        const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Bearer 123@token`);

        expect(response.status).toBe(401);
    });
});