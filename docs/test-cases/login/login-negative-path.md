## TC-LOGIN-002: Verify user cannot log in with invalid credentials

**Preconditions:**
- User is on the login page

**Test Steps:**
1. Enter username: invalid_user
2. Enter password: wrong_password
3. Click the login button

**Test Data:**
- Username: invalid_user
- Password: wrong_password

**Expected Result:**
- Login is unsuccessful
- Error message is displayed: "Username and password do not match"

**Actual Result:**
- Error message displayed: "Epic sadface: Username and password do not match any user in this service"




## TC-LOGIN-003: Verify locked out user cannot log in

**Preconditions:**
- User is on the login page
- Locked user account exists

**Test Steps:**
1. Enter username: locked_out_user
2. Enter password: secret_sauce
3. Click the login button

**Test Data:**
- Username: locked_out_user
- Password: secret_sauce

**Expected Result:**
- Login is unsuccessful
- Error message is displayed indicating the user is locked out

**Actual Result:**
- Error message displayed: "Epic sadface: Sorry, this user has been locked out."