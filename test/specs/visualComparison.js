describe('Example', () => {
  beforeEach( () => {
	// browser.url("/docs/wdio-image-comparison-service.html");
	browser.url("/")
	 browser.maximizeWindow();
  });
  
  it('should save some screenshots', () => {
  	// Save a screen
  	browser.saveScreen('Google.com', {
  		disableCSSAnimation: true,
  		hideScrollBars: true,
  	});
  	
  	// // Save an element
  	// browser.saveElement($('.edit-page-link'), 'firstButtonElement', {
  	// 	resizeDimensions: { 
  	// 		top: 10, 
  	// 		right: 5, 
  	// 		bottom: 30, 
  	// 		left: 10,
  	// 	}
  	// });
  	
  	// Save a full page screens
  	browser.saveFullPageScreen('fullPage', {
  		fullPageScrollTimeout: 3000,
  	});
  });
  
  it('should compare successful with a baseline', () => {
	  // Check a screen
	  browser.url("https://www.google.co.uk")
  	expect(browser.checkScreen('Google.co.uk', {
  		blockOut: [ {
  				height: 10, 
  				width: 5, 
  				x: 40, 
  				y: 65
  			},{
  				height: 250, 
  				width: 500,
  				x: 0,
  				y: 35
  			},
  		],
  		ignoreAlpha: true,
  		blockOutStatusBar: true,
  	})).toEqual(0);
  	
  	// // Check an element
  	// expect(browser.checkElement($('.edit-page-link'), 'firstButtonElement', {
  	// 	ignoreAntialiasing: true,
  		
  	// })).toEqual(0);
  	
  	// Check a full page screens
  	expect(browser.checkFullPageScreen('fullPage', {
  		ignoreColors: true,
  	})).toEqual(0);
	});
});