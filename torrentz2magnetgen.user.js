// ==UserScript==
// @name     Torrentz2 magnet generator
// @version  1
// @grant    none
// @include  https://torrentz2.eu/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js 
// ==/UserScript==

(() => {
    if($('.trackers').length <= 0) return;

    async function getTrackers() {
      const pathname = $('.trackers p a').attr('href');
      return $.get(`https://torrentz2.eu${pathname}`);
    }

    async function getMagnet(trackerList) {
        if(!trackerList) trackerList = await getTrackers();
        return `magnet:?xt=urn:btih:${window.location.pathname.substr(1)}&tr=${trackerList.split(/\s/g).filter(r => r.length > 0).join('&tr=')}`;
    }
    
    function insertMagnet(href) {
        $('<dl/>', { class: 'magnet' })
            .append($('<dt/>')
            .append($('<a/>', { href })
            .append($('<span/>', { class: 'j z sad' }))
            .append($('<span/>', { class: 'dad', text: 'Magnet'})
            ))).insertBefore($('.downurls dl')[0]);
    }
    
    getMagnet().then(insertMagnet);
  
})();
