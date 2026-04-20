export const ENV = {
    BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',

    TIMEOUTS: {
        TEST:   Number(process.env.TEST_TIMEOUT)  || 30000,
        EXPECT: Number(process.env.EXPECT_TIMEOUT) || 5000,
    },

    USERS: {
        STANDARD: {
            username: process.env.STANDARD_USER!,
            password: process.env.STANDARD_PASSWORD!,
        },
        LOCKED: {
            username: process.env.LOCKED_USER!,
            password: process.env.LOCKED_PASSWORD!,
        },
    },
};