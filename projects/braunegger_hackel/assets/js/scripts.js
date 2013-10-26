var screen = $('.screen'),
win = $(window);

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
});

function showScreen() {
	$('.screen-overlay').remove();
	$('.screen').show();
	renderCharts();
}



function renderCharts() {
	var piechart = document.querySelector(".piechart"),
		barchart = document.querySelector(".barchart"),
		r1 = Raphael(piechart),
		r2 = Raphael(barchart),

		//draw piechart
		pie = r1.piechart(150, 150, 100, [79, 14.2, 3.3, 2.7, 0.8], { legend: ["%%.% - Android", "%%.% - iOS", "%%.% - Windows Phone", "%%.% - BlackBerry OS", "%%.% - Sonstige"], legendpos: "east"});

	//hover function pie chart
	pie.hover(function () {
		this.sector.stop();
		this.sector.scale(1.1, 1.1, this.cx, this.cy);

		if (this.label) {
			this.label[0].stop();
			this.label[0].attr({ r: 7.5 });
			this.label[1].attr({ "font-weight": 800 });
		}
	}, function () {
		this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

		if (this.label) {
			this.label[0].animate({ r: 5 }, 500, "bounce");
			this.label[1].attr({ "font-weight": 400 });
		}
	});


	//popup function bar chart
	var fin = function () {
			this.flag = r2.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
		},
		fout = function () {
			this.flag.animate({opacity: 0}, 300, function () {
				this.remove();
			});
		},
		txtattr = { font: "12px sans-serif" };
	
	//draw barchart  
	r2.barchart(50, 10, 300, 220, [[107.45, 124, 161.95, 285.23, 476.74, 671.39]]).hover(fin, fout);
}