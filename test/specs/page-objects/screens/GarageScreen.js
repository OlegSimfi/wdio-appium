class GaragePage {
    get screenTitle() {
        return $('//android.widget.TextView[@text="Garage"]');
    }

    get menuDropdown() {
        return $('//android.widget.TextView[@text="My profile"]');
    }

    get addNewCarButton() {
        return $('//android.widget.TextView[@text="Add Car"]');
    }

    get brandDropdown() {
        return $('');
    }

    get modelDropdown() {
        return $('');
    }

    get brandDropdown() {
        return $('(//android.widget.TextView[@text="Add a car"]/..//android.view.ViewGroup[@content-desc])[2]');
    }

    get modelDropdown() {
        return $('(//android.widget.TextView[@text="Add a car"]/..//android.view.ViewGroup[@content-desc])[3]');
    }

    get mileageField() {
        return $('//android.widget.EditText');
    }

    get addCarButton() {
        return $('//android.widget.TextView[@text="Add"]');
    }

    async getLastAddedCarName() {
        return await $('(//android.view.ViewGroup)[8]/android.widget.TextView[1]').getAttribute('text');
    }
}