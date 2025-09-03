class HomeScreen {
    get signInButton() {
        return $('//android.widget.TextView[@text="Sign in"]');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }
}

export default new HomeScreen();