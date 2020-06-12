class AjaxLoder_Page {

    get loaderIcon() { return $('#loader'); }

    get pageTitle() { return 'WebDriver | Ajax-Loader'; }

    get clickMe_Link() { return $('#button1'); }


    isLoderIconDisplayed(){
        return this.loaderIcon.isDisplayed();
    }
    
    waitForClickMe(){
        this.clickMe_Link.waitForExist({timeout:12000,timeoutMsg:"Unable to find the element"})
        this.clickMe_Link.waitForClickable({timeout:12000,timeoutMsg:"Unable to find the element"})
    }

}

export default new AjaxLoder_Page();