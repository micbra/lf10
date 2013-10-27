var screen = $('.screen'),
win = $(window);

window.onload = function () {
	/*$('.barChartContainer').load('assets/svg/bar-chart.svg', function(response){
		$(this).addClass('svgLoaded');
		if(!response) {
			console.log('error: no response');
		}
	});*/

	jQuery.extend({
		getValues: function(url) {
			var result = null;
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'json',
				async: false,
				success: function(data) {
					result = data;
				}
			});
			return result;
		}
	});
	var results = $.getValues('data.json');

		if (SVG.supported) {
			var draw = SVG('barChartContainer').size('100%', '100%'),
				bar2007 = draw.polygon('88,408 88,468 111,468 111,438 111,438 111,408').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2007'),
				bar2008 = draw.polygon('139,398 139,468 161,468 161,398').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2008'),
				bar2009 = draw.polygon('194,377 194,468 217,468 217,377').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2009'),
				bar2010 = draw.polygon('250,307 250,468 273,468 273,307').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2010'),
				bar2011 = draw.polygon('305,198 305,468 328,468 328,198').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2011'),
				bar2012 = draw.polygon('361,88 361,468 384,468 384,88').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2012'),
				bars = draw.set();

				bars.add(bar2007, bar2008, bar2009, bar2010, bar2011, bar2012);

				line = draw.line(67, 15, 399, 15).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = draw.line(67, 72, 399, 72).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = draw.line(67, 129, 399, 129).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = draw.line(67, 185, 399, 185).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = draw.line(67, 242, 399, 242).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = draw.line(67, 299, 399, 299).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = draw.line(67, 356, 399, 356).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = draw.line(67, 412, 399, 412).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = draw.line(67, 469, 399, 469).stroke({ width: 1, color: '#fff', opacity: 0.25 });

				bars.each(function(){
					this.filter(function(add) {
						var blur = add.offset(2,-2).in(add.sourceAlpha).gaussianBlur('2')
						add.blend(add.source, blur)
					}).size('150%','150%');
				});

				var barChartData = results.data.barChart;

				var elements = $('#barChartContainer .bar').each(function() {
					this.instance.on('mouseover', function(){
						$(this).css('fill', '#7ed907');
						var objectId = this.id,
							id = objectId.replace('bar-', '');
							$('.tooltip span').text(barChartData[id].val).stop().animate({"opacity": 0.85});
							$('.tooltip').css({
								'left': barChartData[id].x + 'px',
								'top': barChartData[id].y + 'px'
							});
						
					});
					this.instance.on('mouseout', function(){
						$(this).css('fill', '#78cf07');
						var objectId = this.id,
							id = objectId.replace('bar-', '');
						$('.tooltip span').stop().animate({"opacity": 0});
					});
				});


				



		} else {
			alert('SVG not supported');
		}



}

win.scroll(function() {

	var scrollPos = win.scrollTop();

	for (i = 86; i >= 0; i--) {
		$('.placeholder').css('top', -250 + scrollPos);

	};

	if(scrollPos > 165) {
		$('.placeholder').css({
			'position' : 'relative',
			'top' : 0
		});
		$('.phone').css('margin-top', '-55px');
		$('.screen-overlay').animate({
			'opacity' : 0
		}, 1000, function() {
			showScreen();
		});
	}

	if(scrollPos > 600) {
		$('.cyan').addClass('waypoint');
	}
	if(scrollPos > 1150) {
		$('.orange').addClass('waypoint');
	}
	if(scrollPos > 1800) {
		$('.turquoise').addClass('waypoint');
	}
});

function showScreen() {
	$('.screen-overlay').remove();
	$('.screen').show();
}



