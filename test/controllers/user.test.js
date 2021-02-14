const sinon = require('sinon');
const UserService = require('../../src/services/user');
const UserController = require('../../src/controllers/user');

describe('UserController', () => {
  const res = { json: () => {} };

  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
    sinon.spy(res, 'json');
  });

  const next = sinon.spy();
  const req = { params: {}, body: {}, token: {} };

  describe('#get', () => {
    const req = { params: { id: "1001" } };

    describe('get user by id', () => {
      const user = { name: "user1001" };

      beforeEach(() => {
        sinon.stub(UserService, 'get').withArgs(req.params.id).resolves(user);
      });

      it('returns user', async () => {
        await expect(UserController.get(req, res, next)).resolves
        expect(res.json.withArgs(user).calledOnce).toBeTruthy();
      });
    });

    describe('error', () => {
      const error = new Error('failed to get user.');

      beforeEach(() => {
        sinon.stub(UserService, 'get').withArgs(req.params.id).rejects(error);
      });

      it('throws error', async () => {
        await expect(UserController.get(req, res, next)).rejects
        expect(next.withArgs(error).calledOnce).toBeTruthy();
      });
    });
  });
});
