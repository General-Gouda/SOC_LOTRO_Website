(function($){
  /* 
   * jQuery plugin that gets images from a picasa album feed and serves them up
   * using a lightbox.  
   * Depends on jquery-lightbox.  
   * Written by Jeff Larkin <jefflarkin@gmail.com> 
   */
  $.fn.picasaGallery = function(feed,options){
    var $this;
    options = $.extend({
      maxImgSize: 912,
      thumbSize: 160,
      photoClass: "photo",
      lightboxOptions: {
        imageLoading: "../images/lightbox-ico-loading.gif",
        imageBtnClose: "../images/lightbox-btn-close.gif",
        imageBtnPrev: "../images/lightbox-btn-prev.gif",
        imageBtnNext: "../images/lightbox-btn-next.gif",
        imageBlank: "../images/lightbox-blank.gif"
      }
    });
    $this = this;
    $.getJSON(feed + '&imgmax=' + options.maxImgSize + '&thumbsize=' + options.thumbSize + 'c',function(data)
    {
      $.each(data.feed.entry,function(idx)
      {
        entry = data.feed.entry[idx];
        thumbnail = entry['media$group']['media$thumbnail'][0];
        content = entry['media$group']['media$content'][0];
        $this.append('<div class="' + options.photoClass + '"><a href="'+ content.url + '"><img src="'+thumbnail.url+'" width="'+ thumbnail.width +'" height="' + thumbnail.height + '"/></a></div>');
      });
      $('.photo a').lightBox(options.lightboxOptions);
      return this;
    });
  }
})(jQuery);
(function($){
  $.fn.blogFeed = function(feed,options){
    var $this;
    options = $.extend({
      itemClass: "blogItem"
    });
    $this = this;
    $.getJSON(feed,function(data)
    {
      $.each(data.value.items,function(idx)
      {
        entry = data.value.items[idx];
        try {
        $this.append('<div class="' + options.itemClass + '"><h2><a href="'+ entry.link + '">' + entry.title + '</a></h2><p>' + entry.summary.content + '</div>');
        } catch(err) { /*console.log(err)*/; }
      });
      return this;
    });
  }
})(jQuery);
