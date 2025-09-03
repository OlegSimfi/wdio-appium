class ForgotPasswordForm {
    get formTitle() {
        return $('//android.widget.TextView[@text="Restore access"]');
    }
}

export default new ForgotPasswordForm();
  