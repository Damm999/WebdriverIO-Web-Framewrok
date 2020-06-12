import Home_Page from '../pageobjects/Home_Page';
import AjaxLoder_Page from '../pageobjects/AjaxLoder_Page';
import iFrame_Page from '../pageobjects/iFrame_Page';
const ContactUs_Page = require('../pageobjects/ContactUs_Page')
const { addStep,addFeature } = require('@wdio/allure-reporter').default
var request = require('sync-request');



beforeEach(function () {
    Home_Page.openHomePage();
    //browser.url('http://www.webdriveruniversity.com/')
    browser.maximizeWindow();
})


describe('webdriver unversity page', () => {


    // to log steps in HTML Reporter
    function logger(message) {
        process.emit('test:log',message)
    }

    // Data Setup
    var res = request('GET', 'https://jsonplaceholder.typicode.com/post/1/comments');
    var contactUsDetails = JSON.parse(res.getBody().toString('utf8'));


    // torun a specific test use .only
    // to skip test use .skip

    it('Verify Contact US should have the right title', () => {

        const title = browser.getTitle()
        expect(browser).toHaveTitle('WebDriverUniversity.com');
        assert.equal(title, 'WebDriverUniversity.com') // node assertion
        browser.$('h1=CONTACT US').click()

        browser.switchWindow('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
        expect(browser).toHaveTitle('WebDriver | Contact Us')
        browser.closeWindow();
        browser.switchWindow('WebDriverUniversity.com')
        expect(browser).toHaveTitle('WebDriverUniversity.com');
        //expect(browser).toHaveTitle('WebDriver | Contact Us');


    })

    it('Verify Login should have the right title', () => {

        const title = browser.getTitle()
        expect(browser).toHaveTitle('WebDriverUniversity.com');
        assert.equal(title, 'WebDriverUniversity.com') // node assertions
        browser.$('h1=LOGIN PORTAL').click()

        browser.switchWindow('WebDriver | Login Portal')

        expect(browser).toHaveTitle('WebDriver | Login Portal')
        browser.closeWindow()
        browser.switchWindow('WebDriverUniversity.com')
        expect(browser).toHaveTitle('WebDriverUniversity.com');


    })

    it('Verify ajax load time', () => {

        browser.$('h1=AJAX LOADER').click();
        browser.switchWindow('WebDriver | Ajax-Loader')
        browser.pause(7000)
        browser.$('#button1').click();
        browser.pause(7000)
        browser.closeWindow()
        browser.switchWindow('WebDriverUniversity.com')


    })


    it('Verify Debug Option', () => {

        browser.$('h1=ACCORDION & TEXT AFFECTS (APPEAR & DISAPPEAR)').click();
        browser.switchWindow('Accordion Items')
        expect(browser).toHaveTitle('Accordion Items');
        browser.debug();
        browser.closeWindow()
        browser.switchWindow('WebDriverUniversity.com')


    })

    it('Verify getCssProperty ', () => {

        const value = $('#page-object-model').getCSSProperty('color')
        console.log(value)

    })

    it('Verify getCssProperty ', () => {
        browser.url('http://www.webdriveruniversity.com/Contact-Us/contactus.html')

        $('[name = "first_name"]').setValue('Checkmaster')
        $('[name = "last_name"]').setValue('Bane')
        $('[name = "email"]').setValue('master23@gmail.com')
        $('[name = "message"]').setValue('Im the best but still need your help')
        const value = $('.contact_button').getCSSProperty('font-family')
        console.log(value)

        browser.$('[type="submit"]').click()

        browser.pause('3000')


    })

    it('Verify map location ', () => {
        browser.url('https://www.bizjournals.com/milwaukee/maps/project-watch')


        browser.pause('30000');
        browser.switchToFrame(1)

        for (var i = 0; i < 3; i++) {
            $('[title="Zoom in"]').click();
            browser.pause('3000');
        }

        browser.pause('3000');

        $('g[id="milwaukee_7663_layer"]').$$(function () {
            return this.querySelectorAll('image'); // Element[]
        })[33].click();

        browser.pause('3000');



        // browser.$('g>image[y="285.42857142857144"]').click();



    })


    // using external data to test and logging steps in report.

    contactUsDetails.forEach(details => {


        it('Verify Contact US Page with external data ', () => {
           
            console.log(details);
        
            process.emit('test:log',"Entering Details ..")
            browser.url('http://www.webdriveruniversity.com/Contact-Us/contactus.html')

            process.emit('test:log',"Entered First Name: "+details.name)
            $('[name = "first_name"]').setValue(details.name)

            process.emit('test:log',"Entered Last Name: Bane")
            $('[name = "last_name"]').setValue('Bane')

            process.emit('test:log',"Entered Email: "+details.email)
            $('[name = "email"]').setValue(details.email)

            process.emit('test:log',"Entered comments: "+details.body)
            $('[name = "message"]').setValue(details.body)

            browser.$('[type="submit"]').click()

            browser.pause('3000')


        })

    });


// using add parameter
    it('Enter details in contact us page using addCommand operation.', () => {
        browser.url('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
        process.emit('test:log',"Entering Details using addCommand ..")

       browser.submitContactUs("john","Bane","john123@gmail.com","This is done using add command operation.")

    })

    // Javascript executor
    it('Interacting with video on web page.',()=>{
        try{
        browser.url('https://www.w3schools.com/html/html5_video.asp')

        // Checking if video is paused
        logger("Checking if video is paused...")
        var isPaused = browser.isVideoPaused();
        console.log("is video paused:::: "+isPaused)
        logger("is video paused: "+isPaused)
        assert.equal(isPaused,true);
        chaiassert.equal(isPaused, true);

        // changing the video width
        logger("Changing video size...")
        var videoWidthMatched = browser.execute(function(){
            var video = document.querySelector('#video1');
            console.log("width: "+ video.style.width)
            return video.style.width = "300px";
        })
        console.log("Video wdth: "+videoWidthMatched);
        logger("Video wdth: "+videoWidthMatched)
        videoWidthMatched.should.equal('300px');

        //browser.debug();

        browser.pause('5000')
    }catch(error){
        logger("Exception occured in test due to: "+error.toString())
        console.log("Exception occured in test due to: "+error.toString())
        assert.fail();
    }

    })

    it('Using Page Object Model for contact us page.', () => {
        browser.url('http://www.webdriveruniversity.com/Contact-Us/contactus.html')

        logger('Entering details in contact us page.')
        ContactUs_Page.setFirstName('Checkmaster')
        ContactUs_Page.setLastName('Bane')
        ContactUs_Page.setEmailAddress('master23@gmail.com')
        ContactUs_Page.setComments('Im the best but still need your help')      

        ContactUs_Page.clickSubmitBUtton();

        
       logger(ContactUs_Page.verifyUnsuccessfulMessage())

        browser.pause('3000')


    })

    it('Bable sample',()=>{

        Home_Page.openContactUsPage();
        browser.switchWindow('WebDriver | Contact Us')
        ContactUs_Page.submitContactUsPage("Rahul","Keerthi","ramesh@gmail.com","Test comments");
        browser.closeWindow();
        browser.switchWindow('WebDriverUniversity.com');
        browser.pause('2000')
    })

    it('Wait for exisit, display, enabled, pause sample',()=>{

        Home_Page.openAjaxLoderPage();
        browser.switchWindow(AjaxLoder_Page.pageTitle);
        AjaxLoder_Page.isLoderIconDisplayed().should.equal(true);
        AjaxLoder_Page.waitForClickMe();
        AjaxLoder_Page.clickMe_Link.click();
        browser.closeWindow();
        browser.switchWindow(Home_Page.pageTitle);
        browser.pause('2000')
    })

    
    it.only('Handling iFrames sample',()=>{
        Home_Page.iFrame_link.waitForDisplayed({ timeout: 3000 })
       
        Home_Page.iFrame_link.scrollIntoView()
        Home_Page.openiFrames();
        addStep("Handling Ifames")
        browser.switchWindow(iFrame_Page.pageTitle)
        iFrame_Page.switchToiFrame1().should.equal(true);
        browser.closeWindow();
        browser.switchWindow(Home_Page.pageTitle);

    })
})