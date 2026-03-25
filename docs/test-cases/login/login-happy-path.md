## TC-LOGIN-001: Verify user can log in with valid credentials

**Preconditions:**
- User is on the login page
- Valid username and password exist

**Test Steps:**
1. Enter a valid username
2. Enter a valid password
3. Click the login button

**Test Data:**
- Username: standard_user
- Password: secret_sauce

**Expected Result:**
- User is successfully logged in
- User is redirected to the inventory page
- Inventory items are visible

## TC-LOGIN-004: Verify that a logged in user can log out

**Preconditions:**
- User is on the login page
- Valid username and password exist

**Test Steps:**
1. Enter a valid username
2. Enter a valid password
3. Click the login button
4. The User is logged in and click on header
5. The user clicks on the log out button

**Expected Results:**
- The application should show a Message confirming that the user has been logged out
- The User should be redirected back to the login page

**Actual Result:**
- The user is logged out and is redirected to home screen