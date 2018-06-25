/* Zmiana buttonow w tabach */
$(function() {
		$('a.gallery').each(function() {
			const $button = $(this).find('button');

			$button.on('click', function(e) {
				const $this = $(this);
					const $btns = $("*").find('button.gallery-button');
					$btns.removeClass('active'); 
					$this.addClass('active');
				
			});
		});
	});

/* Koniec */
function showTitle(){
	document.getElementById("page-name").innerHTML = document.title;
}

/* Pokaz slajdów w prezentacji pojazdów */
function slideShow() {
	var slideIndex = 1;
	showSlides(slideIndex);

	// Next/previous controls
	function plusSlides(n) {
	  showSlides(slideIndex += n);
	}

	// Thumbnail image controls
	function currentSlide(n) {
	  showSlides(slideIndex = n);
	}

	function showSlides(n) {
	  var i;
	  var slides = document.getElementsByClassName("mySlides");
	  var dots = document.getElementsByClassName("demo");
	  if (n > slides.length) {slideIndex = 1}
	  if (n < 1) {slideIndex = slides.length}
	  for (i = 0; i < slides.length; i++) {
	    slides[i].style.display = "none";
	  }
	  for (i = 0; i < dots.length; i++) {
	    dots[i].className = dots[i].className.replace(" active", "");
	  }
	  slides[slideIndex-1].style.display = "block";
	  dots[slideIndex-1].className += " active";
	}

}

/* Koniec */

/* Formularz */

	const validateForm = (function() {
	//prywatne właściwości
	let options = {};
	const classError = 'error';

	const showFieldValidation = function(input, inputIsValid) {
		if (!inputIsValid) {
			input.parentNode.classList.add(options.classError);
		} else {
			input.parentNode.classList.remove(options.classError);
		}
	};

	const testInputText = function(input) {
		let inputIsValid = true;
		const pattern = input.getAttribute('pattern');

		if (pattern != null) {
			const reg = new RegExp(pattern, 'gi');
			if (!reg.test(input.value)) {
				inputIsValid = false;
			}
		} else {
			if (input.value == '') {
				inputIsValid = false;
			}
		}

		if (inputIsValid) {
			showFieldValidation(input, true);
			return true;
		} else {
			showFieldValidation(input, false);
			return false;
		}
	};

	const testInputEmail = function(input) {
		const mailReg = new RegExp('^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$', 'gi');
		if (!mailReg.test(input.value)) {
			showFieldValidation(input, false);
			return false;
		} else {
			showFieldValidation(input, true);
			return true;
		}
	};

	//dynamicznie pokazujemy czy są błędy w formluarzu
	const prepareElements = function() {
		const elements = options.form.querySelectorAll(':scope [required]');

		[].forEach.call(elements, function(element) {
			//sprawdzenie typu pola
			if (element.nodeName.toUpperCase() == 'INPUT') {
				const type = element.type.toUpperCase();

				if (type == 'TEXT') {
					element.addEventListener('keyup', function() {testInputText(element)});
					element.addEventListener('blur', function() {testInputText(element)});
				}
				if (type == 'EMAIL') {
					element.addEventListener('keyup', function() {testInputEmail(element)});
					element.addEventListener('blur', function() {testInputEmail(element)});
				}				
			}
			if (element.nodeName.toUpperCase() == 'TEXTAREA') {
				element.addEventListener('keyup', function() {testInputText(element)});
				element.addEventListener('blur', function() {testInputText(element)});
			}
		});
	};

	const formSubmit = function() {
		options.form.addEventListener('submit', function(e) {
			e.preventDefault();

			let validated = true;

			const elements = options.form.querySelectorAll(':scope [required]');

			[].forEach.call(elements, function(element) {
				if (element.nodeName.toUpperCase() == 'INPUT') {
					const type = element.type.toUpperCase();
					if (type == 'EMAIL') {
						if (!testInputEmail(element)) validated = false;
					}					
					if (type == 'TEXT') {
						if (!testInputText(element)) validated = false;
					}
				}
				if (element.nodeName.toUpperCase() == 'TEXTAREA') {
					if (!testInputText(element)) validated = false;
				}
			});

			if (validated) {
				this.submit();
			} else {
				return false;
			}
		});
	}

	//metoda publczina
	const init = function(_options) {
		//do modulu przekazujemy opcje, ustawimy je lub domyślne
		options = {
			form : _options.form || null,
			classError : _options.classError || 'error'
		}

		if (options.form == null || options.form == undefined || options.form.length == 0) {
			console.warn('validateForm: źle przekazany formularz');
			return false;
		}

		//wylaczenie domyslnych dymków walidacji
		options.form.setAttribute('novalidate', 'novalidate');

		prepareElements();
		formSubmit();
	};

	return {
		init : init
	}

})();

/* Koniec */