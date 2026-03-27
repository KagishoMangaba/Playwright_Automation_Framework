// env.ts
import dotenv from 'dotenv';

const env = process.env.ENV || 'qa';
dotenv.config({ path: `.env.${env}` });

// Only expose getters, so sensitive data isn't stored in plain objects
export const ENV = {
  get BASE_URL() {
    return process.env.BASE_URL || 'https://www.saucedemo.com';
  },

  get TIMEOUTS() {
    return {
      TEST: Number(process.env.TEST_TIMEOUT) || 30000,
      EXPECT: Number(process.env.EXPECT_TIMEOUT) || 5000,
    };
  },

  get USERS() {
    return {
      STANDARD: {
        username: process.env.STANDARD_USER!,
        password: process.env.STANDARD_PASSWORD!,
      },
      LOCKED: {
        username: process.env.LOCKED_USER!,
        password: process.env.LOCKED_PASSWORD!,
      },

      
    };
  },
};