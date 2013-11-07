var screen = $('.screen'),
win = $(window);

window.onload = function () {

	jQuery.extend({
		getValues: function(url, async) {
			var result = null;
			$.ajax({
				url: url,
				type: 'get',
				dataType: 'json',
				async: async,
				success: function(data) {
					result = data;
				}
			});
			return result;
		}
	});
	var results = $.getValues('data.json', false),
		getComments = $.getValues('comments.json', false);

	var commentData = getComments;

	
	//read comments
	function readComments(source) {
		$.each(source.comments, function(index, value) {
			var newComment = '<div class="comment"><p class="author"><strong>'+value.author+'</strong></p><p class="text">'+value.message+'</p></div>';
			$('.latestComments').append(newComment);
		});
	}


	readComments(commentData);
	

	//write comments
	$('.commentform').submit(function(e) {
		e.preventDefault();

		var getAuthor = $('.commentform .author').val();
		var getText = $('.commentform textarea').val();

		if(getAuthor.length != 0 && getText.length != 0) {
			commentData.comments.push({author: getAuthor, message: getText}); //push new data to comment-object
			$('.latestComments').empty();//delete all comments
			$('.commentform .author').val('');
			$('.commentform textarea').val(''); //delete form values

			readComments(commentData);// ...and load them again


			//Since the HTML5 File-API isn't very stable yet, there is no easy way to write files on the user agent side.
			//Hence the comments on this page are only available until reload :(
			//write comments to comments.json
			/*function onInitFs(fs) {
				fs.root.getFile('comments.json', {create: true}, function(fileEntry) {

				// Create a FileWriter object for our FileEntry.
				fileEntry.createWriter(function(fileWriter) {
					fileWriter.onwriteend = function(e) {
					console.log('Write completed.');
					};
					fileWriter.onerror = function(e) {
					console.log('Write failed: ' + e.toString());
					};

					// Create a new Blob and write it to comments.json.
					var blob = new Blob([commentData]);
				});

				});
			}

			window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, onInitFs);*/
		}

	})




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

				drawBarChart.line(67, 15, 399, 15).stroke({ width: 1, color: '#fff', opacity: 0.25 });
				drawBarChart.line(67, 72, 399, 72).stroke({ width: 1, color: '#fff', opacity: 0.25 });
				drawBarChart.line(67, 129, 399, 129).stroke({ width: 1, color: '#fff', opacity: 0.25 });
				drawBarChart.line(67, 185, 399, 185).stroke({ width: 1, color: '#fff', opacity: 0.25 });
				drawBarChart.line(67, 242, 399, 242).stroke({ width: 1, color: '#fff', opacity: 0.25 });
				drawBarChart.line(67, 299, 399, 299).stroke({ width: 1, color: '#fff', opacity: 0.25 });
				drawBarChart.line(67, 356, 399, 356).stroke({ width: 1, color: '#fff', opacity: 0.25 });
				drawBarChart.line(67, 412, 399, 412).stroke({ width: 1, color: '#fff', opacity: 0.25 });
				drawBarChart.line(67, 469, 399, 469).stroke({ width: 1, color: '#fff', opacity: 0.25 });

				bars.each(function(){
					this.filter(function(add) {
						var blur = add.offset(2,-2).in(add.sourceAlpha).gaussianBlur('2');
						add.blend(add.source, blur);
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

			//Line Chart
			var drawLineChart = SVG('lineChartContainer').size('100%', '100%');

			var line_android = drawLineChart.polyline('362.238,84.29 274.901,234.296 187.563,335.549 100.226,378.3').fill('none').stroke({ width: 3, color: '#009BB1' }).attr('class', 'line').attr('id', 'android'),
				line_ios = drawLineChart.polyline('362.238,46.791 274.901,168.669 187.563,253.046 100.226,339.299').fill('none').stroke({ width: 3, color: '#EA5437' }).attr('class', 'line').attr('id', 'ios'),
				line_rim = drawLineChart.polyline('362.238,346.799 274.901,353.174 187.563,382.05').fill('none').stroke({ width: 3, color: '#FFDD00' }).attr('class', 'line').attr('id', 'rim'),
				line_win = drawLineChart.polyline('362.238,339.299 274.901,358.049 187.563,377.55').fill('none').stroke({ width: 3, color: '#C96691' }).attr('class', 'line').attr('id', 'win'),

				i1 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#E3000B'}).attr('cx', '100').attr('cy', '339').attr('class', 'point').attr('id', 'i1'),
				i2 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#E3000B'}).attr('cx', '188').attr('cy', '253').attr('class', 'point').attr('id', 'i2'),
				i3 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#E3000B'}).attr('cx', '275').attr('cy', '169').attr('class', 'point').attr('id', 'i3'),
				i4 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#E3000B'}).attr('cx', '362').attr('cy', '47').attr('class', 'point').attr('id', 'i4'),

				a1 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#009BB1'}).attr('cx', '100').attr('cy', '378').attr('class', 'point').attr('id', 'a1'),
				a2 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#009BB1'}).attr('cx', '188').attr('cy', '336').attr('class', 'point').attr('id', 'a2'),
				a3 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#009BB1'}).attr('cx', '275').attr('cy', '234').attr('class', 'point').attr('id', 'a3'),
				a4 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#009BB1'}).attr('cx', '362').attr('cy', '84').attr('class', 'point').attr('id', 'a4'),

				w1 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#FFDD00'}).attr('cx', '188').attr('cy', '382').attr('class', 'point').attr('id', 'w1'),
				w2 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#FFDD00'}).attr('cx', '275').attr('cy', '353').attr('class', 'point').attr('id', 'w2'),
				w3 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#FFDD00'}).attr('cx', '362').attr('cy', '347').attr('class', 'point').attr('id', 'w3'),

				b1 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#C96691'}).attr('cx', '188').attr('cy', '378').attr('class', 'point').attr('id', 'b1'),
				b2 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#C96691'}).attr('cx', '275').attr('cy', '358').attr('class', 'point').attr('id', 'b2'),
				b3 = drawLineChart.circle('8').fill('#fff').stroke({width: 2, color: '#C96691'}).attr('cx', '362').attr('cy', '339').attr('class', 'point').attr('id', 'b3');


			drawLineChart.line(83, 9, 379, 9).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 28, 379, 28).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 46, 379, 46).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 65, 379, 65).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 84, 379, 84).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 103, 379, 103).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 121, 379, 121).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 140, 379, 140).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 159, 379, 159).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 178, 379, 178).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 196, 379, 196).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 215, 379, 215).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 234, 379, 234).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 253, 379, 253).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 271, 379, 271).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 290, 379, 290).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 309, 379, 309).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 328, 379, 328).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 346, 379, 346).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 365, 379, 365).stroke({ width: 1, color: '#fff', opacity: 0.25 });
			drawLineChart.line(83, 384, 379, 384).stroke({ width: 1, color: '#fff', opacity: 0.25 });

			var lineChartData = results.data.lineChart;

			var pointElements = $('#lineChartContainer .point').each(function() {
					this.instance.on('mouseover', function(){
						var color = this.instance.attr('stroke');
						$(this).css('stroke', shadeColor(color, 10));
						var id = this.id;
							$('.turquoise .tooltip span').text(lineChartData[id].val).stop().animate({"opacity": 0.85});
							$('.turquoise .tooltip').css({
								'left': this.instance.attr('cx')+45 + 'px',
								'top': this.instance.attr('cy')+80 + 'px'
							});
						
					});
					this.instance.on('mouseout', function(){
						$(this).css('stroke', this.instance.attr('stroke'));
						$('.turquoise .tooltip span').stop().animate({"opacity": 0});
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