## TC-LOGIN-5: Verify error message when password field is left empty

**Preconditions:**

- User is on the login page

**Test Steps:**

- Enter username: standard_user
- Leave password field empty
- Click Login

**Test Data:**

- Username: standard_user
- Password: ""

**Expected Result:**

- Login should be rejected
- User remains on the login page
- Error message should be displayed:
- Epic sadface: Password is required

**Actual Result:**

- Login rejected
- User remains on login page
- Error Message Displayed: Epic sadface: Password is required

**Status:**

**Pass**



## ✅ TC-LOGIN-6: Verify error message when username field is left empty

**Preconditions:**

- User is on the login page

**Test Steps:**

- Leave username field empty
- Enter password: secret_sauce
- Click Login

**Test Data:**

- Username: ""
- Password: secret_sauce

**Expected Result:**

- Login should be rejected
- User remains on the login page
- Error message should be displayed:
- Epic sadface: Username is required

**Actual Result:**

- Login rejected
- User remains on login page
- Error Message Displayed: Epic sadface: Username is required

**Status:**
- Pass


