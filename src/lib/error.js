class InsanError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.httpStatus = status;
    this.class = this.constructor;
  }
}

class UserNotFoundError extends InsanError {
  constructor(message = 'User not found') {
    super(message, 404);
  }
}

class ValidationError extends InsanError {
  constructor(details) {
    super(`Validation error: ${details}`, 400);
  }
}

class InvalidLoginError extends InsanError {
  constructor(message = 'Username or password incorrect') {
    super(message, 401);
  }
}

class UserAlreadyUsedError extends InsanError {
  constructor(message = 'Username already used') {
    super(message, 409);
  }
}

class InternalServerError extends InsanError {
  constructor(message = 'Something happened with our internal server :(') {
    super(message);
  }
}

module.exports = {
  InsanError,
  UserNotFoundError,
  ValidationError,
  InternalServerError,
  InvalidLoginError,
  UserAlreadyUsedError,
};
