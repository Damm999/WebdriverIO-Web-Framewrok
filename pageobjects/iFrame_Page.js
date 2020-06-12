class Home_Page {

    get contactUs_Link() { return $('h1=CONTACT US'); }

    get pageTitle() { return 'WebDriver | IFrame'; }

    get frame1() { return $('#frame'); }

    get ajaxLoder_Link() { return $('#ajax-loader'); }
    
    get iFrame_link() { return $('#iframe'); }

   
    openiFrames(){
        this.iFrame_link.click();
    }

    switchToiFrame1(){
        browser.switchToFrame(this.frame1);
        return $('div#carousel-example-generic').isDisplayed()
    }

}

export default new Home_Page();