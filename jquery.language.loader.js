;(function($) {

  (function(pluginName) {

    defaults = {
      hidden: null,      
    };    

    function setBrowserLanguage() {
      var lang = getBrowserLanguage();
      var promiseLangConfig = getUrlLang(lang);      
      promiseLangConfig.done(function (url) {
        var langPath = '/' + lang + '/'; 
        //var langUrl = document.location.hostname + langPath;
        alert(url);
        var promiseLangUrl = checkUrl(url);
        promiseLangUrl.success(function () {
            window.location.href = url;
        });
      });
    };

    function getBrowserLanguage() {
        var lang = window.navigator.languages ? window.navigator.languages[0] : null;
        lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        if (lang.indexOf('-') !== -1)
            lang = lang.split('-')[0];

        if (lang.indexOf('_') !== -1)
            lang = lang.split('_')[0];

        return lang;
    };

    function getUrlLang(lang) {
        $.getJSON( "/jquery.language.loader/langsUrl.config", function( data ) {            
            $.each( data, function( key, val ) {                       
                 if(val.id === lang){
                     alert('d'+val.url);
                     return val.url;  
                 }                   
            });
        });
    }

    function checkUrl(url) {
        return $.ajax({
            url: url
        });
    }

    function init() {             
        setBrowserLanguage();
    };

    $.fn[pluginName] = function(options) {
      defaults = $.extend(true, {}, defaults, options);
      init();
    };

    $.fn[pluginName].defaults = defaults;

  })('langLoader');

})(jQuery);