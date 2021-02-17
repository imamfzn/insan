const sinon = require('sinon');
require('sinon-mongoose');
const User = require('../../../src/models/user');
const Autan = require('../../../src/connections/autan');
const UserService = require('../../../src/services/user');

describe('UserService#current', () => {
  const authId = "auth1001";

  const autanResult = { username: 'user1001', role: 'admin', _id: authId };
  const user = new User({ name: 'user 1001', authId });

  afterEach(() => {
    sinon.restore();
  });

  describe('success', () => {
    beforeEach(() => {
      sinon.mock(User).expects('findOne').withArgs({ auth_id: authId }).resolves(user);

      sinon.stub(Autan, 'get').withArgs(authId).resolves(autanResult);
    });

    it('returns current user', async () => {
      try {
        const me = await UserService.current(authId);
        expect(me).toHaveProperty('authId', authId);
        expect(me).toHaveProperty('username', 'user1001');
        expect(me).toHaveProperty('role', 'admin');
        expect(me).toHaveProperty('name', 'user 1001');
      } catch (err) {
        expect(err).toBeNull();
      }
    });
  });
});
