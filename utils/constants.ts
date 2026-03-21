export const USERS = {
  standard:  { username: 'standard_user',        password: 'secret_sauce' },
  locked:    { username: 'locked_out_user',       password: 'secret_sauce' },
  problem:   { username: 'problem_user',          password: 'secret_sauce' },
  glitch:    { username: 'performance_glitch_user', password: 'secret_sauce' },
} as const;

export const PRODUCTS = {
  backpack:   'Sauce Labs Backpack',
  bikeLight:  'Sauce Labs Bike Light',
  boltShirt:  'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie:     'Sauce Labs Onesie',
  redShirt:   'Test.allTheThings() T-Shirt (Red)',
} as const;

export const URLS = {
  login:     '/',
  inventory: '/inventory.html',
  cart:      '/cart.html',
  checkout:  '/checkout-step-one.html',
} as const;
