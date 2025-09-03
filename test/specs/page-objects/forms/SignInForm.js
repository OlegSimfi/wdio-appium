class SignInForm {
    get emailField() {
        return $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[1]');
    }

    get passwordField() {
        return $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[2]');
    }

    get loginButton() {
        return $('//android.widget.TextView[@text="Login"]');
    }

    get wrongDataMessage() {
        return $('//android.widget.TextView[@text="Wrong email or password"]');
    }

    get emptyEmailErrorMessage() {
        return $('//android.widget.TextView[@text="Email is required"]');
    }

    get emptyPasswordErrorMessage() {
        return $('//android.widget.TextView[@text="Password is too short"]');
    }

    get registrationButton() {
        return $('//android.widget.TextView[@text="Registration"]');
    }

    get forgotPasswordButton() {
        return $('//android.widget.TextView[@text="Forgot Password"]');
    }

    async setEmail(email) {
        await this.emailField.setValue(email);
    }

    async setPassword(password) {
        await this.passwordField.setValue(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickForgotPasswordButton() {
        await this.forgotPasswordButton.click();
    }

    async clickRegistrationButton() {
        await this.registrationButton.click();
    }
}

export default new SignInForm();
