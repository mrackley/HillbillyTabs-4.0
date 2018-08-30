/*
 * HillbillyTabs.2013 - Place SharePoint 2013 Web Parts in Tabs
 * Version 4.0 
 * @requires jQuery v1.7 or greater 
 * @requires jQueryUI v1.11 or greater 
 * @requires jQuery.cookie 
 *
 * Copyright (c) 2013-2018 Mark Rackley
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */
/**
 * @description Places SharePoint WebPart into jQuery UI Tabs
 * @type jQuery
 * @name HillbillyTabs.4
 * @category Plugins/HillbillyTabs
 * @author Mark Rackley / http://www.markrackley.net / mrackley@paitgroup.com
 */

$.fn.HillbillyTabs= function (options)
{
    var opt = $.extend({}, {
	tabConfiguration: undefined,
        rememberLastTab: false,
        showTitle: true
    }, options);

    $("#contentBox").hide();

    var CEWPID = "";
    var tabDivID = "";
    var ulID = "";
    $("#tabsContainer").closest("[id^='MSOZoneCell_WebPart']").find("span[id^='WebPartCaptionWPQ']").each(function()
    {
        CEWPID = $(this).attr("id");
    });
    if (CEWPID == "")
    {
        CEWPID = $("#tabsContainer").closest("[id^='MSOZoneCell_WebPart']").attr("id");
    }
    
    tabDivID = CEWPID + "TabsDiv";
    ulID = CEWPID + "Tabs";
    $("#tabsContainer").attr("id",tabDivID).append("<ul id='"+ulID+"'></ul>");
    
    if(opt.tabConfiguration == undefined || opt.tabConfiguration.length == 0)
    {
		var index = 0;
		var found = false;
		$("#" + tabDivID).closest("div.ms-webpart-zone, div.ms-rte-layoutszone-inner").find("span[id^='WebPartTitleWPQ']").each(function()
		{
			if($(this).find("[id^='WebPartCaptionWPQ']").attr("id") != CEWPID)
			{
				found = true;
				var title = $(this).attr("title");
				
				$("#"+ulID).append('<li onclick="window.dispatchEvent(new Event(\'resize\'));"><a href="#Tab'+index+CEWPID+'" id="TabHead'+index+CEWPID+'" onclick="HillbillyTabClick(this.id);">'+
					title+'</a></li>').after('<div id="Tab'+index+CEWPID+'"></div>');
				
                if (!opt.showTitle)
                {
                    $(this).hide();
                }
				var webPart = $(this).closest("[id^='MSOZoneCell_WebPart']");

				
				$("#Tab" + index+CEWPID).append((webPart));
				index++;
			}
		});		
		if (!found)
		{
			$("#" + tabDivID).closest("div.ms-webpart-zone, div.ms-rte-layoutszone-inner").find("h2.ms-webpart-titleText").each(function()
			{
				if($(this).find("span[id^='WebPartCaptionWPQ']").attr("id") != CEWPID)
				{
					found = true;
					var title = $(this).text();
					
					$("#"+ulID).append('<li onclick="window.dispatchEvent(new Event(\'resize\'));"><a href="#Tab'+index+CEWPID+'" id="TabHead'+index+CEWPID+'" onclick="HillbillyTabClick(this.id);">'+
						title+'</a></li>').after('<div id="Tab'+index+CEWPID+'"></div>');
					
                    if (!opt.showTitle)
                    {
                        $(this).hide();
                    }
					var webPart = $(this).closest("[id^='MSOZoneCell_WebPart']");
					
					$("#Tab" + index+CEWPID).append((webPart));
					index++;
				}
			});
		}
		
    } else {
    	for(index in opt.tabConfiguration)
        {
            var title = opt.tabConfiguration[index].title;
			var webParts = opt.tabConfiguration[index].webParts;
			var horizontal = opt.tabConfiguration[index].horizontal;
            {
                $("#"+ulID).append('<li onclick="window.dispatchEvent(new Event(\'resize\'));"><a href="#Tab'+index+CEWPID+'" id="TabHead'+index+CEWPID+'" onclick="HillbillyTabClick(this.id);">'+
                    title+'</a></li>').after('<div id="Tab'+index+CEWPID+'"></div>');
            
				if (horizontal != undefined && horizontal)
				{
					$("#Tab" + index+CEWPID).append("<table><tr valign='top' id='TR"+index+CEWPID+"'></tr></table>");
				}
                for(index2 in webParts)
                {
					var webPart = GetWebPart(webParts[index2]);
					if(webPart != undefined && webPart.length)
					{
						if (horizontal != undefined && horizontal)
						{
							$("#TR" + index+CEWPID).append("<td id='TD"+index+"_"+index2+CEWPID+"'></td>");
							$("#TD" + index+"_"+index2+CEWPID).append(webPart);
						}
						else{
							$("#Tab" + index+CEWPID).append(webPart);
						}
					}                                
                }
            }
        }
    }
    
     HideErrorParts();

    $("#"+tabDivID).tabs();
    
	var tabTitle = getParameterByName("tab");
	if(tabTitle != undefined)
	{
		ShowTab(tabTitle);
	}
	else if(opt.defaultTab)
	{
		ShowTab(opt.defaultTab);
	}
	else if(opt.rememberLastTab)
    	ShowActiveTab();

    $("#contentBox").fadeIn("slow");

    function ShowActiveTab()
    {
        $("#" + $.cookie("ActiveTab")).click();
    }

	function ShowTab(tabTitle)
	{
		$("#"+ulID).find("li").each(function(){
			//console.log($(this).text());
			if($(this).text() == tabTitle){
				$(this).find("a").click();
				return;
			}
		});
	}

    function HideErrorParts()
    {
        $("span[id^='WebPartCaptionWPQ']").each(function()
        {
            $(this).prev("span:contains('Error')").each(function()
            {
                    
                    var webPart = $(this).closest("span").closest("[id^='MSOZoneCell_WebPart']").hide();
                
            });
        });
    }

	function getParameterByName(key) {
		key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
		var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
		return match && decodeURIComponent(match[1].replace(/\+/g, " "));
	}

	function GetWebPart(title)
	{
		var webPart = $("span[id^='WebPartTitleWPQ'][title='"+title+"']");
		if(webPart.length)
		{
			webPart = ($(webPart).closest("[id^='MSOZoneCell_WebPart']"));
		}else{
			var found = false;
			$("h2.ms-webpart-titleText").each(function()
			{
				$(this).find("span:contains('"+title+"')").each(function()
				{
					if ($(this).text() == title){
						found = true;
						webPart = ($(this).hide().closest("span").closest("[id^='MSOZoneCell_WebPart']"));
					}
				});
			});
			if (!found)
			{
				$("span[id^='WebPartCaptionWPQ']").each(function()
				{
					$(this).prev("span:contains('"+title+"')").each(function()
					{
						if ($(this).text() == title){
							found = true;
							var webPart = $(this).closest("span").closest("[id^='MSOZoneCell_WebPart']");
						}						
					});
				});
			}
		}
		return webPart;
	}

}

function HillbillyTabClick(id)
{
	$.cookie("ActiveTab",id,{ path: '/' });
}    

