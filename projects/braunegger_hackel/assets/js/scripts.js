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
			// BarChart
			var drawBarChart = SVG('barChartContainer').size('100%', '100%'),
				bar2007 = drawBarChart.polygon('88,408 88,468 111,468 111,438 111,438 111,408').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2007'),
				bar2008 = drawBarChart.polygon('139,398 139,468 161,468 161,398').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2008'),
				bar2009 = drawBarChart.polygon('194,377 194,468 217,468 217,377').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2009'),
				bar2010 = drawBarChart.polygon('250,307 250,468 273,468 273,307').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2010'),
				bar2011 = drawBarChart.polygon('305,198 305,468 328,468 328,198').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2011'),
				bar2012 = drawBarChart.polygon('361,88 361,468 384,468 384,88').fill('#78CF07').stroke({ width: 0 }).attr('class', 'bar').attr('id', 'bar-2012'),
				bars = drawBarChart.set();

				bars.add(bar2007, bar2008, bar2009, bar2010, bar2011, bar2012);

				line = drawBarChart.line(67, 15, 399, 15).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = drawBarChart.line(67, 72, 399, 72).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = drawBarChart.line(67, 129, 399, 129).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = drawBarChart.line(67, 185, 399, 185).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = drawBarChart.line(67, 242, 399, 242).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = drawBarChart.line(67, 299, 399, 299).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = drawBarChart.line(67, 356, 399, 356).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = drawBarChart.line(67, 412, 399, 412).stroke({ width: 1, color: '#fff', opacity: 0.25 }),
				line = drawBarChart.line(67, 469, 399, 469).stroke({ width: 1, color: '#fff', opacity: 0.25 });

				bars.each(function(){
					this.filter(function(add) {
						var blur = add.offset(2,-2).in(add.sourceAlpha).gaussianBlur('2')
						add.blend(add.source, blur)
					}).size('150%','150%');
				});

				var barChartData = results.data.barChart;

				var barElements = $('#barChartContainer .bar').each(function() {
					this.instance.on('mouseover', function(){
						var color = this.instance.attr('fill');
						$(this).css('fill', shadeColor(color, 10));
						var objectId = this.id,
							id = objectId.replace('bar-', '');
							$('.cyan .tooltip span').text(barChartData[id].val).stop().animate({"opacity": 0.85});
							$('.cyan .tooltip').css({
								'left': barChartData[id].x + 'px',
								'top': barChartData[id].y + 'px'
							});
						
					});
					this.instance.on('mouseout', function(){
						$(this).css('fill', '#78cf07');
						$('.cyan .tooltip span').stop().animate({"opacity": 0});
					});
				});

			//Pie Chart
			var drawPieChart = SVG('pieChartContainer').size('100%', '100%'),
			android = drawPieChart.path('m152,151.99699l149.62802,-10.463c5.77798,82.63899 -56.52802,154.31598 -139.16602,160.095s-154.31201,-56.53 -160.09001,-139.16899c-5.779,-82.64001 56.527,-154.31601 139.16599,-160.09501c3.30501,-0.231 7.149,-0.365 10.46201,-0.365l0,149.99699z').fill('#009BB1').stroke({ width: 2, color: '#fff' }).attr('class', 'pie').attr('id', 'android'),
			ios = drawPieChart.path('m152,151.99699l53.75301,-140.035c55.683,21.376 91.71498,70.072 95.87498,129.57201l-149.62799,10.463z').fill('#EA5437').stroke({ width: 2, color: '#fff' }).attr('class', 'pie').attr('id', 'ios'),
			rim = drawPieChart.path('m152,151.99699l26.047,-147.71899c9.79001,1.727 18.42601,4.123 27.707,7.684l-53.754,140.03499z').fill('#C96691').stroke({ width: 2, color: '#fff' }).attr('class', 'pie').attr('id', 'rim'),
			win = drawPieChart.path('m152,151.99699l0,-149.99699c9.94099,0 16.257,0.553 26.04601,2.278l-26.04601,147.71899z').fill('#FFDD00').stroke({ width: 2, color: '#fff' }).attr('class', 'pie').attr('id', 'win');

			pie = drawPieChart.set();
			pie.add(android, ios, rim, win);

			var pieChartData = results.data.pieChart;

			var pieElements = $('#pieChartContainer .pie').each(function() {
					this.instance.on('mouseover', function(){
						var color = this.instance.attr('fill');
						$(this).css('fill', shadeColor(color, 10));
						var id = this.id;
							$('.orange .tooltip span').text(pieChartData[id].val+'%').stop().animate({"opacity": 0.85});
							$('.orange .tooltip').css({
								'left': '270px',
								'top':  '235px'
							});
						
					});
					this.instance.on('mouseout', function(){
						$(this).css('fill', this.instance.attr('fill'));
						$('.orange .tooltip span').stop().animate({"opacity": 0});
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

function shadeColor(color, percent) {   
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, B = (num >> 8 & 0x00FF) + amt, G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
}