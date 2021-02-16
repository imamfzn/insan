const sinon = require('sinon');
require('sinon-mongoose');
const User = require('../../../src/models/user');
const Autan = require('../../../src/connections/autan');
const UserService = require('../../../src/services/user');

describe('UserService#create', () => {
  const payload = {
    username: 'user1001',
    password: 'pass1234',
    name: 'user 1001',
    role: 'user',
  };

  const { username, password, role, name } = payload;

  const autanPayload = { username, password, role };
  const autanResult = { username, role, _id: 'auth1001' };
  const user = new User({ username, name, authId: 'auth1001' });

  afterEach(() => {
    sinon.restore();
  });

  describe('success', () => {
    beforeEach(() => {
      sinon.stub(Autan, 'register').withArgs(autanPayload).resolves(autanResult);
      sinon.stub(User.prototype, 'save').returns()
    });

    it('returns new user', async () => {
      try {
        const userCreated = await UserService.create(payload);
        expect(userCreated).toHaveProperty('username', username);
        expect(userCreated).toHaveProperty('role', 'user');
        expect(userCreated).toHaveProperty('auth_id', 'auth1001');
        expect(userCreated).toHaveProperty('_id');
        expect(userCreated).toHaveProperty('name', name);
        expect(userCreated).not.toHaveProperty('password');
      } catch (err) {
        expect(err).toBeNull();
      }
    });
  });
});
