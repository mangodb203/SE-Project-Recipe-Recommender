const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`, // Generate a unique email
      password: 'password123',
    };
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe('user');
    expect(savedUser.encry_password).toBeDefined();
    expect(savedUser.salt).toBeDefined();
  });

  it('should fail to save user with invalid email', async () => {
    const userWithInvalidEmail = new User({
      name: 'Test User',
      email: 'invalid-email',
      password: 'password123'
    });

    let err;
    try {
      await userWithInvalidEmail.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should authenticate user with correct password', async () => {
    const user = new User({
      name: 'Test User',
      email: 'auth@example.com',
      password: 'correctpassword'
    });
    await user.save();

    const isAuthenticated = user.authenticate('correctpassword');
    expect(isAuthenticated).toBe(true);
  });

  it('should not authenticate user with incorrect password', async () => {
    const user = new User({
      name: 'Test User',
      email: 'auth2@example.com',
      password: 'correctpassword'
    });
    await user.save();

    const isAuthenticated = user.authenticate('wrongpassword');
    expect(isAuthenticated).toBe(false);
  });
});