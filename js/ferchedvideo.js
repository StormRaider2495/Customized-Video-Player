var currentPage=0;
var videoJson;

function PageRender(idx){
    var num=parseInt(idx);
    $("video").attr("src",videoJson[num].src);
    $("video").attr("poster",videoJson[num].cover);
    $('header').text(videoJson[num].title);       
    initializePlayer();    
    seekBar.value=0;
    currentTime.innerHTML="0:00";
    disableButton();
};
//getting the next page index
function next(){
     currentPage++;
     disableButton();       
     initializePlayer();
     PageRender(currentPage);
     stopPlay();
};
//getting the previous page index
function prev(){
      currentPage--;
      disableButton();
      initializePlayer();
      PageRender(currentPage);
      stopPlay();
};
//making next and prev button disabled
function disableButton(){
    if(currentPage == 0){
        $('.prev').attr('disabled','true');
        $('.next').removeAttr('disabled');
    }
    else if(currentPage == videoJson.length-1){
      $('.next').attr("disabled","disabled");
      $('.prev').removeAttr('disabled');
    }else{
        $('.next').removeAttr('disabled');
          $('.prev').removeAttr('disabled');
    }
};

var getData = function(dataUrl) {
  return $.ajax({
    url: dataUrl,
    type:"GET",
    success:function(data,satus,xhr){
      return data;
     }
  });
};

$(document).ready(function() {
   var x = getData("js/fetchedVideo.json");
   x.then(function(resp) {  //try    
     videoJson = resp;
     PageRender(0);
   })
   .catch(function(err){  //catch   
   })

});
