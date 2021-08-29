"use strict";

function getTransitionEndEventName() {
  var transitions = {
    "transition": "transitionend",
    "OTransition": "oTransitionEnd",
    "MozTransition": "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  };
  var bodyStyle = document.body.style;

  for (var transition in transitions) {
    if (bodyStyle[transition] != undefined) {
      return transitions[transition];
    }
  }
}

var iteratorTimeout, iteratorInterval, iteratorHeld, qtyInput, qtyCount, qtyIncreasing;
$(function () {
  $(document).ready(function () {
    $('[data-bs-toggle="popover"]').popover();
    $('[data-bs-toggle="tooltip"]').tooltip();
    $("#mobile_menu").on("show.bs.offcanvas", function () {
      $("#mobile_menu_toggle").addClass("active");
    });
    $("#mobile_menu").on("hide.bs.offcanvas", function () {
      $("#mobile_menu_toggle").removeClass("active");
    });
  });
  $(".product__quantity .increment").on("click", function () {
    qtyIncreasing = $(this).hasClass('decrease') ? false : true;
    qtyInput = qtyIncreasing ? $(this).prev() : $(this).next();
    qtyCount = parseInt(qtyInput.val() || 0);

    if (!qtyIncreasing && qtyCount < 1) {
      return null;
    }

    ;
    $(qtyInput).val(qtyCount + (qtyIncreasing ? 1 : -1));
  }); // BELOW IS SOME CODE I WROTE TO ALLOW FOR PRESSING AND HOLDING INCREMENT BUTTONS
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
});
"use strict";

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
  var isIe = /(trident|msie)/i.test(navigator.userAgent);

  if (isIe && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
      var id = location.hash.substring(1),
          element;

      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }

      element = document.getElementById(id);

      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    }, false);
  }
})();