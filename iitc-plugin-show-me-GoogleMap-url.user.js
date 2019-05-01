// ==UserScript==
// @id             iitc-plugin-show-me-GoogleMap-url
// @name           IITC plugin: Show me Google Map URL
// @category       Info
// @version        0.0.1
// @namespace      https://github.com/tarmn3
// @updateURL
// @downloadURL
// @description    Google Map URL to a portal
// @author         tarmn3
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==

function wrapper(){
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function(){};

// PLUGIN START ///////////////////////////////////////////////////////xq/

	// use own namespace for plugin
	window.plugin.showMeGoogleMapUrl = function() {};

	window.plugin.showMeGoogleMapUrl.appendDetails = function(data){
		var guid = window.selectedPortal;
		var p = window.portals[guid];
        var dat = p.options.data;

        var lat = dat.latE6/1E6;
        var lng = dat.lngE6/1E6;

        // var gmapUrl = 'https://maps.google.com/maps?ll='+lat+','+lng+'&q='+lat+','+lng;
        var gmapUrl = 'https://maps.google.com/maps?ll='+lat+','+lng+'&q='+lat+','+lng;

        var permaHtml = $('<div>').html( $('<a>').attr({href:gmapUrl, title:'a Map URL link to this portal'}).text('GMap link') ).html();

	    $('#portaldetails .linkdetails').before('<div class="portalGoogleMapUrl">'+permaHtml+'</div>');

	}

	var setup = function() {
		window.addHook('portalDetailsUpdated', window.plugin.showMeGoogleMapUrl.appendDetails);
	};

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function'){
	setup();
}else{
	if(window.bootPlugins)
		window.bootPlugins.push(setup);
	else
		window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
