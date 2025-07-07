// ==UserScript==
// @author         Nerestaren
// @name           Layer volatile scout portals
// @category       Layer
// @version        0.0.1
// @description    Layer with portals that are not scouted and are volatiles
// ==/UserScript==

function wrapper(plugin_info) {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if(typeof window.plugin !== 'function') window.plugin = function() {};
    plugin_info.buildName = 'main';
    plugin_info.dateTimeVersion = '2025-07-07-101500';
    plugin_info.pluginId = 'layer-volatile-scout';

/* exported setup, changelog --eslint */
/* global L -- eslint */

var changelog = [
  {
    version: '0.0.1',
    changes: ['Initial'],
  }];

// use own namespace for plugin
var thisPlugin = {};
window.plugin.layerVolatileScout = thisPlugin;

function addPortal(data) {
  const portal = data.portal;
  const portalData = portal.options.data;
  const ornaments = portalData.ornaments;
  const history = portalData.history;
  if (history && ornaments && !history.scoutControlled && ornaments.includes('sc5_p')) {
    L.marker(portal._latlng, {
      
    }).addTo(thisPlugin.layerGroup);
  }
}

function removePortal(data) {

}

function setup() {
  thisPlugin.layerGroup = new L.LayerGroup();
  window.addLayerGroup('Volatile scout, not scouted', thisPlugin.layerGroup, false);
  window.addHook('portalAdded', addPortal);
  window.addHook('portalRemoved', removePortal);
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
