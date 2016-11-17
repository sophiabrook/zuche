
$(function(){
	$('.menu').on('mouseenter','li>a',function(){
		$(this).addClass('active')
	}).on('mouseleave','li>a',function(){
		$(this).removeClass('active')
	})	
	$('.login-main').on('mouseenter','a',function(){
		$(this).addClass('active')
	}).on('mouseleave','a',function(){
		$(this).removeClass('active')
	})

	function carousel(el){
    	this.ct = el; //.banner-wrap
    	this.ct.css({
    		width:$(window).width()
    	})
    	this.ct.find('.slides').find('li').css({
	    	width:$(window).width()
	    })
    	this.imgCt = el.find('.slides');
    	this.items = el.find('.slides').children();
    	this.pre = el.find('.pre');
    	this.next = el.find('.next');
    	this.bullet = el.find('.bullet');
    	this.imgCount = this.items.size();
    	this.imgWidth = this.items.width();
    	this.items.first().clone().appendTo(this.imgCt);
	    this.items.last().clone().prependTo(this.imgCt);
	    this.imgRealCount = el.find('.slides').children().size();
	    this.curIdx = 0;
		this.isAnimate = false;
	    this.bind();
	    this.auto()
	    console.log(this.items,this.imgRealCount,this.imgWidth)
	    
	    
	    
    }

    carousel.prototype = {
    	bind:function(){
    		var self = this;
    		this.imgCt.css({left:0-this.imgWidth,width:this.imgRealCount*this.imgWidth});
    		

		    this.pre.on('click',function(e){
		    	e.preventDefault();
		    	self.playPre()
		    });
		    this.next.on('click',function(e){
		    	e.preventDefault();
		    	self.playNext()
		    });
		    this.bullet.children().on('click',function(e){
		    	e.preventDefault();
		    	var idx = $(this).index();
		    	if(idx>self.curIdx){
		    		self.playNext(idx-self.curIdx)
		    	}else if(idx<self.curIdx){
		    		self.playPre(self.curIdx-idx)
		    	}

		    });
		},
		playNext:function (idx){
			var self = this;
		    	var idx = idx || 1;
		    	if(this.isAnimate) return;
		    	this.isAnimate = true;
		    	this.imgCt.animate({'left':'-='+idx*this.imgWidth},1000,function(){
		    		self.curIdx = (self.curIdx + idx)%self.imgCount;
		    		console.log(self.curIdx)
		    		if(self.curIdx === 0){
		    			self.imgCt.css({'left':0-self.imgWidth})
		    			
		    		}
		    		self.bullett()
		    		self.isAnimate = false;
		    	})
		    },
		playPre:function(idx){
			var self = this;
		    	var idx = idx || 1;
		    	if(this.isAnimate) return;
		    	this.isAnimate = true;
		    	this.imgCt.animate({'left':'+='+(idx*this.imgWidth)},1000,function(){
		    		self.curIdx = (self.imgCount+self.curIdx-idx)%self.imgCount;
		    		console.log(self.curIdx)
		    		if(self.curIdx === self.imgCount-1){
		    			self.imgCt.css({'left':0-self.curIdx*self.imgWidth})
		    			
		    		}
		    		self.bullett()
		    		self.isAnimate = false;
		    	})
		    },
		bullett:function(){
			var self = this;
    			this.bullet.children().removeClass('active')
    					.eq(self.curIdx).addClass('active')
    	},
    	auto:function(){
    		var self = this;
    		var clock = setInterval(function(){
    			self.playNext()
    		},2000)
    	}
    }
    $('.banner-wrap').each(function(){
    	new carousel($(this))
    })
    $(window).on('resize',function(){
    	 $('.banner-wrap').each(function(){
	    	new carousel($(this))
	    })
    })



    $('.quche span').on('click',function(){
    	$(this).toggleClass('active')
    })
    $('.huanche span').on('click',function(){
    	$(this).toggleClass('active')
    })

    function  tabs($el){
    	var el = $el;
    	items = el.children()
    	
    	items.on('click',function(e){
    		 var self = $(e.target).parents('li')
    		 var idx = self.index()
	    	self.addClass('active')
	    			.siblings().removeClass('active')
	    	$('.detail').children().eq(idx).addClass('active')
	    				.siblings().removeClass('active')
    	})
    	
    }
    tabs($('.service'))
    
    $('.city a').on('click',function(e){
    	e.preventDefault()
    	//console.log($(this))
    	var siblings = $(this).parents('ul').find('a')
    	var idx = $(this).parent().index()
    	

    	siblings.removeClass('active');
    	$(this).addClass('active');

    	$('.city_de ul.city_car >li').eq(idx).addClass('active')
    			.siblings().removeClass('active')
    	
    	console.log(siblings)
    })
})
