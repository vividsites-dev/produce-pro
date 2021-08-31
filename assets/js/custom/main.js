function getTransitionEndEventName() {
	var transitions = {
		"transition"      : "transitionend",
		"OTransition"     : "oTransitionEnd",
		"MozTransition"   : "transitionend",
		"WebkitTransition": "webkitTransitionEnd"
	 }
	let bodyStyle = document.body.style;
	for(let transition in transitions) {
		if(bodyStyle[transition] != undefined) {
			return transitions[transition];
		} 
	}
}

var iteratorTimeout, iteratorInterval, iteratorHeld, qtyInput, qtyCount, qtyIncreasing;
$(function () {
	$(document).ready( function() {
		$('[data-bs-toggle="popover"]').popover();
		$('[data-bs-toggle="tooltip"]').tooltip();

		$("#mobile_menu").on("show.bs.offcanvas", function() {
			$("#mobile_menu_toggle").addClass("active");
		});
		$("#mobile_menu").on("hide.bs.offcanvas", function() {
			$("#mobile_menu_toggle").removeClass("active");
		});
	});

	for( var i = 0; i < incrementors.length; i++) {
		incrementors[i].addEventListener("click", function(e) {
			e.preventDefault();
			qtyIncreasing = (this.classList.contains("decrease") ? false : true);
			qtyInput = this.parentNode.querySelector("input");
			qtyCount = parseInt(qtyInput.value || 0);
			console.log(this,qtyCount,e);
			if(!qtyIncreasing && qtyCount < 1) {
				return null;
			};
			qtyInput.value = (qtyCount + (qtyIncreasing ? 1 : -1));
		});
	}

	$(".increment").click(function(e) {
		e.preventDefault();
		qtyIncreasing = ($(this).hasClass('decrease') ? false : true);
		qtyInput = (qtyIncreasing ? $(this).prev() : $(this).next());
		qtyCount = parseInt(qtyInput.val() || 0);
		if(!qtyIncreasing && qtyCount < 1) {
			return null;
		};
		$(qtyInput).val(qtyCount + (qtyIncreasing ? 1 : -1));
	});


	// BELOW IS SOME CODE I WROTE TO ALLOW FOR PRESSING AND HOLDING INCREMENT BUTTONS
	// PRETTY GOOD BUT SLIGHTLY BUGGY PERFORMANCE

	// $(".product__quantity .increment").on( "mousedown", function() {
	// 	iteratorHeld = false;
	// 	qtyIncreasing = ($(this).hasClass('decrease') ? false : true);
	// 	qtyInput = (qtyIncreasing ? $(this).prev() : $(this).next());
	// 	qtyCount = parseInt(qtyInput.val() || 0);
	// 	if(!qtyIncreasing && qtyCount < 1) {
	// 		return null;
	// 	};
	// 	iteratorTimeout = setTimeout( function() {
	// 		iteratorHeld = true;
	// 		if( qtyIncreasing ) {
	// 			iteratorInterval = setInterval( function() {
	// 				qtyInput.val(qtyCount++);
	// 			}, 40);
	// 		} else {
	// 			iteratorInterval = setInterval( function() {
	// 				qtyCount--;
	// 				if(qtyCount >= 0) qtyInput.val(qtyCount);
	// 			}, 40);
	// 		}
	// 	}, 80);
	// 	return null;
	// });

	// $(".product__quantity .increment").on( "mouseup", function() {
	// 	clearTimeout(iteratorTimeout);
	// 	clearInterval(iteratorInterval);
	// 	if(!qtyIncreasing && qtyCount < 1) {
	// 		return null;
	// 	};
	// 	if(!iteratorHeld) {
	// 		if( qtyIncreasing ) {
	// 			$(qtyInput).val(qtyCount + 1);
	// 		} else {
	// 			$(qtyInput).val(qtyCount - 1);
	// 		}
	// 	}
	// 	return null;
	// });
})