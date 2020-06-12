class ContactUs_Page {

    get pageTitle() { return 'WebDriver | Contact Us'; }

    get firstName() { return $('[name = "first_name"]'); }

    get lastName() { return $('[name = "last_name"]'); }

    get emailAddress() { return $('[name = "email"]'); }

    get comment() { return $('[name = "message"]'); }

    get submitButton() { return $('[type="submit"]'); }

    get successfulSubmissionText() { return $('#contact_reply h1'); }

    get unSuccessfulSubmissionText() { return $('body'); }


    setFirstName(firstName) {
        this.firstName.setValue(firstName)
    }

    setLastName(lastName) {
        this.lastName.setValue(lastName)
    }

    setEmailAddress(emailAddress) {
        this.emailAddress.setValue(emailAddress)
    }

    setComments(comments) {
        this.comment.setValue(comments)
    }

    clickSubmitBUtton() {
        this.submitButton.click();
    }

    conformSuccessMessage() {

        this.successfulSubmissionText.getText().should.equal('Thank You for your Message!')

    }

    verifyUnsuccessfulMessage() {
        expect(this.unSuccessfulSubmissionText.getText()).toHaveValue('Error: all fields are required')
    }

    submitContactUsPage(firstName, lastName, emailAddress, comments) {
    
        this.firstName.setValue(firstName)
        this.lastName.setValue(lastName)
        this.emailAddress.setValue(emailAddress)
        this.comment.setValue(comments)

        this.submitButton.click();

        this.conformSuccessMessage();
        browser.pause('3000')
    }

}

module.exports = new ContactUs_Page();