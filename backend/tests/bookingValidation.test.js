const { body } = require('express-validator');
const { handleValidationErrors } = require('../validations/bookingValidation');
const { AppError } = require('../utils/errorHandler');

describe('booking validation middleware', () => {
  it('passes validation errors to next with an AppError', async () => {
    const req = {
      body: {},
      method: 'POST',
      path: '/api/bookings',
    };
    const res = {};
    const next = jest.fn();

    await new Promise((resolve) => {
      body('packageId').notEmpty()(req, res, resolve);
    });

    handleValidationErrors(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
    expect(next.mock.calls[0][0].statusCode).toBe(400);
  });
});
