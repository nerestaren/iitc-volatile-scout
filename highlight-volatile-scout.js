// ==UserScript==
// @author         Nerestaren
// @name           Highlight volatile scout portals
// @category       Highlighter
// @version        0.0.1
// @description    Highlight portals that are not scouted and are volatiles
// ==/UserScript==

function wrapper(plugin_info) {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if(typeof window.plugin !== 'function') window.plugin = function() {};
    plugin_info.buildName = 'main';
    plugin_info.dateTimeVersion = '2025-07-07-101500';
    plugin_info.pluginId = 'highlight-volatile-scout';

/* exported setup, changelog --eslint */
/* global L -- eslint */

var changelog = [
  {
    version: '0.0.1',
    changes: ['Initial'],
  }];

// use own namespace for plugin
var highlightVolatileScout = {};
window.plugin.portalHighlighterVolatileScout = highlightVolatileScout;

// exposed objects
highlightVolatileScout.styles = {
  common: {
    fillOpacity: 1,
    fillColor: 'hotpink'
  },
};

function highlightPortalsVolatileScout(data) {
  var ornaments = data.portal.options.data.ornaments;
  var history = data.portal.options.data.history;
  if (!history || !ornaments) {
    return;
  }
  if (!history.scoutControlled && ornaments.includes('sc5_p')) {
    data.portal.setStyle(highlightVolatileScout.styles.common);
  }
}

function setup() {
  window.addPortalHighlighter('Volatile scout: not scanned', highlightPortalsVolatileScout);
}

    setup.info = plugin_info; //add the script info data to the function as a property
    if (typeof changelog !== 'undefined') setup.info.changelog = changelog;
    if(!window.bootPlugins) window.bootPlugins = [];
    window.bootPlugins.push(setup);
    // if IITC has already booted, immediately run the 'setup' function
    if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
