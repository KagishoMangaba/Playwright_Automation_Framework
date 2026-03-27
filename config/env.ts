function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`❌ Missing env variable: ${name}`);
  }
  return value;
}

export const ENV = {
  BASE_URL: required(process.env.BASE_URL, 'BASE_URL'),

  USERS: {
    STANDARD: {
      username: required(process.env.STANDARD_USER, 'STANDARD_USER'),
      password: required(process.env.STANDARD_PASSWORD, 'STANDARD_PASSWORD'),
    },
    LOCKED: {
      username: required(process.env.LOCKED_USER, 'LOCKED_USER'),
      password: required(process.env.LOCKED_PASSWORD, 'LOCKED_PASSWORD'),
    },
  },

  TIMEOUTS: {
    TEST: Number(process.env.TEST_TIMEOUT || 30000),
    EXPECT: Number(process.env.EXPECT_TIMEOUT || 5000),
  }
};