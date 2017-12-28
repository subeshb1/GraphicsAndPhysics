$(document).ready(function () {
  let settingsHTML = '<div class="container col-12 col-lg-8 row center"> <div class="col-12 col-lg-6" id="prop"> <h6>Curve Properties</h6> <div class="form-group row"> <label for="" class="col-4">T</label> <input type="number" class="form-control col-8 col-lg-6" placeholder="0 < T <= 1" max="1" min="0" step="0.005" id="t"> </div> <div class="form-group row"> <label for="" class="col-4">No of Control Points</label> <input type="number" class="form-control col-8 col-lg-6" placeholder="Minimum 3" min="3" id="numCtrPt"> </div> <div class="form-group row"> <input type="checkbox"  class="form-control col-1" id="showLine"> <label for="checkBox" class="col-10">Tick to show the lines joining the interpolated points.</label> </div> </div> <div class="col-12 col-lg-6" id="ctrPt"> <h6>Curve Control Points</h6> </div> <div class="col-12 "> <button id="save" class="float-right btn btn-success">Save</button> </div> <div style="height:200px"></div> </div>';
  let animateHTML = '';
  let dataBez = {
    animate: bez["animate"],
    t: bez.t/1000,
    ctrpt: bez.ctrpt.map( item =>  item.pos),
    showLine: bez.showLine,
    numCtrPt: bez.ctrpt.length

  };
  
  function updateData() {
    dataBez =  {
      animate: bez["animate"],
      t: bez.t/1000,
      ctrpt: bez.ctrpt.map( item =>  item.pos),
      showLine: bez.showLine,
      numCtrPt: bez.ctrpt.length
  
    };
  }
  console.log(dataBez);
  
  /**
   * side bar toggler
   */
  $('.sidebar').css('left', -window.innerWidth);
  $('.sidebar').show();
  // $('.content').html(settingsHTML);
  setUpSettings();
  $('#sideBarToggler').click(function () {

    if ($(this).data('status')) {
      $(this).data('status', 0)
      $(this).children().animate({
        opacity: 0
      }, 'fast', () => $(this).children().toggleClass('fa fa-bars').toggleClass('fa fa-arrow-left')).animate({
        opacity: 1
      }, 'fast');
      if (!$(this).data('expand')) {
        $('.sidebar').animate({
          left: '0',
        }, () => $(this).data('status', 1));
        $(this).data('expand', true)
        let active = $('.sidebar  .check').data('name');
        console.log(active);
        if(active == "settings")
          setUpSettings();
        else
          setUpAnnimation();
        
      } else {
        $('.sidebar').animate({
          left: -window.innerWidth,
        }, () => $(this).data('status', 1));

        $(this).data('expand', false)
      }

    }
  });



  $(window).on('resize', function () {
    if (!$('#sideBarToggler').data('expand'))
      $('.sidebar').css('left', -window.innerWidth);
  });

  /**
   * Side bar list controller
   */

  $('.sideList').on('click', function () {
    if (!$(this).hasClass('check')) {
      let passive = "sideList list-group-item col-6 col-md-2 border  rounded-top text-center bg-secondary ";
      let active = "sideList list-group-item col-6 col-md-2  text-center border rounded-top border-bottom-0 bg-light check";
      $('.sideList').attr('class', passive);
      $(this).attr('class', active);
      
    
    }
    updateData();
    let html = "";
    if($(this).data('name') === 'settings')
      setUpSettings();
    else
      setUpAnnimation();
  });


  function setUpSettings() {
    updateData();
    $('.content').html(settingsHTML);
    $('#prop').find('input').each(function(index) {
      let item = $(this);
      console.log(item);   
      if(item.attr('id')!='showLine')
        item.val(dataBez[item.attr('id')]);
      else
        item.attr('checked',dataBez[item.attr('id')]);
    });
    let num = $('#numCtrPt').val();
    
    for (let i =0; i < num; i++) {
      $('#ctrPt').append(
        `      
        <div class="form-group row">  
              <label for="" class="col-2">CtrPt ${i+1}</label>
              <div class="input-group col-5">
                <span class="input-group-addon">x</span>
                <input type="number" class="form-control col-8 col-lg-6" value=${dataBez.ctrpt[i].x}>
              </div>

              <div class="input-group col-5">
                <span class="input-group-addon"  >y</span>
                <input type="number" class="form-control col-8 col-lg-6" value=${dataBez.ctrpt[i].y}>
              </div>
            </div>

          </div>

        `
      )
    }
  }

  function setUpAnnimation() {

  }

  

  //setting up for changes

  $('.content').on('focusout','#numCtrPt' ,function() {
    console.log('done');
    
    if($(this).val() != dataBez["numCtrPt"]) {
      let num = $(this).val();
      $('#ctrPt').html("<h6>Curve Points</h6>");
      for (let i =0; i < num; i++) {
        $('#ctrPt').append(
          `   
          
          <div class="form-group row">  
                <label for="" class="col-2">CtrPt ${i+1}</label>
                <div class="input-group col-5">
                  <span class="input-group-addon">x</span>
                  <input type="number" class="form-control col-8 col-lg-6" value="100">
                </div>
  
                <div class="input-group col-5">
                  <span class="input-group-addon"  >y</span>
                  <input type="number" class="form-control col-8 col-lg-6" value="100">
                </div>
              </div>
  
            </div>
  
          `
        )
      }
    }

  });



  $('.content').on('click','#save',function() {
    $('#prop').find('input').each(function() {
      let prop = $(this).attr('id');
      if(prop != 'showLine') {
        dataBez[prop] = parseFloat($(this).val());
      } else {
        dataBez[prop] = $(this).attr('checked') === "checked" ? true:false;
      }
    });

    dataBez.ctrpt = [];
    $('#ctrPt').find('.row').each(function(index){
      
      let item = $(this);
      let pt = {x:0,y:0};
      pt.x = parseFloat(item.find('input').eq(0).val());
      pt.y = parseFloat(item.find('input').eq(1).val());
      dataBez.ctrpt.push(pt)  ;
    }); 
    console.log(dataBez.ctrpt);
    changeBez();
    
  });

  function changeBez() {
    for(let prop in dataBez) {
      if(prop != "numCtrPt" ) {
      if(prop === 't')
        bez[prop] = bez.lerp(dataBez[prop],0,1000);
      else if(prop!="ctrpt")
      bez[prop] = dataBez[prop];
      else {
        bez[prop] =  dataBez[prop].map( item => {
          return new Circle(item.x,item.y,10);
        }); 
        bez.children = [];
        bez.ctrpt.forEach(pt => bez.children.unshift(pt));
      }
    }
  }
  }
});