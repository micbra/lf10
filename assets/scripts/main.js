(function ($) {
	function filter(hash) {
		var filter = hash.replace(' active', '');
		if(filter == 'all') {
			$('.grid .project').show('slow');
		} else {
			$('.grid .project').not('.' + filter).hide('slow');
			$('.grid .project.' + filter).show('slow');
		}
	}

	function renderProjects(data) {
		authors = data['authors'].replace(/,/g, '<br>');

		$('.preview h2').text(data['category']).css('color', '#' + data['color']);
		if(data['image'].length >1) {
			$('.preview img').attr('src', data['image']);
		} else {
			$('.preview img').attr('src', '');
		}
		$('.preview a').css('background', '#' + data['color']).attr('href', data['link']);
		$('.preview .authors').html(authors);
	}

	function init() {
		//check for file:///
		var url = document.URL.indexOf('file:///');
		if(url == 0 ) {
			alert('This Site won\'t run from a file:/// URL!');
		}

		// render grid
		$.ajax({
			url: 'data.json',
			async: false,
			dataType: 'json',
			success: function (data) {
				$.each(data.infographs, function(i, j) {
					$.each(j.projects, function(k, l) {
						var item = '<li class="project '+ i +'"><a data-category="'+ j.name +'" data-color="'+ j.color +'" data-image="'+ l.image +'" data-authors="'+ l.authors +'" data-link="'+ l.url +'" href="#"><img src="'+ l.image +'"></a></li>';
						$('.grid ul').append(item);
					});
				});
			}
		});

		//#hash shizzle
		if(location.hash) {
			var hash = location.hash.replace('#', '');
			filter(hash);
		}
		$(window).on('hashchange', function() {
			var hash = location.hash,
				newhash = location.hash.replace('#', '');
			filter(newhash);
		});

		//100% height
		width = $(window).innerWidth();
		height = $(window).innerHeight();
			if(width <= 1024) {
					$('.left').css('height', 'auto');
				} else {
					$('.left').css('height', height + 'px');
				}
		//100% height even on resize
		$(window).resize(function() {
			height = $(window).innerHeight();
			width = $(window).innerWidth();
			if(width <= 1024) {
				$('.left').css('height', 'auto');
			} else {
				$('.left').css('height', height + 'px');
			}
		});

		//for testing purposes: grid gets background color
		var test = $('.grid .project li a').first().css('baclground', 'red');;
		$('.grid .project').each(function() {
			var color = $(this).find('a').data('color');
			$(this).css('background', '#' + color);
			
		});

		//filter projects
		$('.navi li a').on('click', function() {
			$('a').removeClass('active');
			$(this).addClass('active');
			filter($(this).attr('class'));
		});

		//display first project if none is selected
		var preview = $('.preview a').attr('href');
		if(preview == "" || preview == undefined) {
			var data = $('.project a').first().data();
			renderProjects(data);
		}

		//project display shizzle
		$('.project a').on('click', function(){
			var data = $(this).data();
			renderProjects(data);
		});

		//tablet navigation
		$('.menu').on('click', function() {
			$('.navi').toggle(400);
			$(this).toggleClass('up');
		});


	};

	$(init);



})(jQuery);