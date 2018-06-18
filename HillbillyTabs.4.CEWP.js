<script type="text/javascript" src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/ui/1.11.2/jquery-ui.min.js"></script> 
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js"></script> 
<script type="text/javascript" src="../SiteAssets/jquery.HillbillyTabs.4.js"></script> 

<link  type="text/css" rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/start/jquery-ui.css" /> 

<div id="tabsContainer"></div>

<script type="text/javascript">

     jQuery(document).ready(function($) {

	/************************************************************************************* */
	// This example places all web parts in the same zone into tabs
		$().HillbillyTabs();
    /*************************************************************************************** */

	/************************************************************************************* */
	// This example places all web parts in the same zone into tabs, and shows you how to use the
	// new parameters
//		$().HillbillyTabs({
//			defaultTab: "<name of tab>", //if specified the tab title entered will always be the default tab displayed when the page loades
//			rememberLastTab: true //if this value is true, the user is taken to the last tab they were view when the page reloads
//                      showTitle: false //if this is true (default) the title of the web part is displayed in the tab. only applicable to single web part tabs	
//		});
    /*************************************************************************************** */

	/************************************************************************************* */
	// This example places specific web parts into tabs, one web part per tab

	/*
		var tabConfiguration = [];

		var thisTab = {
			title: "My Tab Title",
			webParts: ["<title of Web Part>"]
		}

		tabConfiguration.push(thisTab);

		thisTab = {
			title: "My 2nd Tab Title",
			webParts: ["<title of 2nd Web Part>"]
		}

		tabConfiguration.push(thisTab);

		$().HillbillyTabs({
			tabConfiguration: tabConfiguration
		});
	*/


    /*************************************************************************************** */

	/************************************************************************************* */
	// This example places specific web parts into tabs where the first tab contains multiple web parts
	// and the web parts are arranged horizontally

	/*
		var tabConfiguration = [];

		var thisTab = {
			title: "My Multi Web Part Tab Title",
			webParts: ["<title of Web Part>","<title of 2nd Web Part>"],
			horizontal: true  
		}

		tabConfiguration.push(thisTab);

		thisTab = {
			title: "My single Tab Title",
			webParts: ["<title of 3rd Web Part>"]
		}

		tabConfiguration.push(thisTab);

		$().HillbillyTabs({
			tabConfiguration: tabConfiguration
		});
    */
	
	/*************************************************************************************** */

	});
</script>
