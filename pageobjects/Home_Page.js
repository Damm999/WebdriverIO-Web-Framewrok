class Home_Page {

    get contactUs_Link() { return $('h1=CONTACT US'); }

    get pageTitle() { return 'WebDriverUniversity.com'; }

    get loginPortal_link() { return $('h1=LOGIN PORTAL'); }

    get ajaxLoder_Link() { return $('#ajax-loader'); }
    
    get iFrame_link() { return $('#iframe'); }

    openHomePage(){
        browser.url('/')
    }

    openContactUsPage(){
        this.contactUs_Link.click();
    }

    openLoginPage(){
        this.loginPortal_link.click();
    }

    openAjaxLoderPage(){
        this.ajaxLoder_Link.click();
    }

    openiFrames(){
        this.iFrame_link.click();
    }

}

export default new Home_Page();