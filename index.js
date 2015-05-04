module.exports = (function(){
	'use strict';

	function E(){}

	E.prototype.addClass = function addClass(className){
		var split = className.split(" ");

		for( var i = 0; i < split.length; i++ ){
			if( !split[i] ){ continue; }
			if( this._.classList ){ this._.classList.add(split[i]); }
			else{ this._.className = split[i]; }
		}
		return this;
	};

	E.prototype.removeClass = function removeClass(className){
		if( this._.classList ){ this._.classList.remove(className); }
		else{
			this._.className = this._.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
		return this;
	};

	E.prototype.hide = function hide(){
		if( this._.style.display !== "none" ){
			this._.style.display = "none";
		}
		return this;
	};

	E.prototype.show = function show(){
		if( this._.style.display !== "block" ){
			this._.style.display = "block";
		}
		return this;
	};

	E.prototype.on = function on(eventNames, eventCallback, useCapture){

		useCapture = !!useCapture;
		eventNames = eventNames.split(" ");

		for( var i = 0, len = eventNames.length; i < len; i++ ){
			this._.addEventListener(eventNames[i], eventCallback, useCapture);
		}

		return this;
	};

	E.prototype.off = function off(eventNames, eventCallback){

		eventNames = eventNames.split(" ");

		for( var i = 0, len = eventNames.length; i < len; i++ ){
			this._.removeEventListener(eventNames[i], eventCallback);
		}

		return this;
	};

	E.prototype.one = function one(eventName, eventCallback){
		var self = this;
		return this.on(eventName, function cb(){
			self.off(eventName, cb);
			eventCallback.apply(this, [].slice.apply(arguments));
		});
	};

	E.prototype.append = function append(arr){

		var args = arr instanceof Array ? arr : arguments;

		for( var i = 0, len = args.length; i < len; i++ ){
			this._.appendChild( args[i] instanceof E ? args[i]._ : args[i] );
		}

		return this;
	};

	E.prototype.text = function text(textContent, append){

		// textContent is faster than innerText

		var el = this.textWrap || this._;

		// Change text
		el.textContent = (append ? el.textContent : "") + textContent;

		return this;
	};


	E.prototype.attr = function(name, value){

		if( typeof name !== "string" ){ throw new Error("An attribute name is required"); }

		if( typeof value !== "string" ){ return this._.getAttribute(name); }

		this._.setAttribute(name, value);

		return this;
	};

	E.prototype.remove = function(){
		if( !this._.parentNode ){ return; }
		this._.parentNode.removeChild(this._);

		return this;
	};

	return function (el, opts){

		var instance = new E();

		// el is a string
		if( typeof el === "string" ){

			// Create element
			instance._ = document.createElement(el);

			if( typeof opts === "object" ){

				var _opts = Object.create(opts);


				// Text container element
				if( typeof _opts.textWrap === "string" ){

					instance.textWrap = document.createElement(_opts.textWrap);
					instance._.appendChild( instance.textWrap );
				}

				// Inner text
				if( typeof _opts.text === "string" ){
					instance.text(_opts.text);
				}

				// Inner HTML
				if( typeof _opts.html === "string" ){
					instance._.innerHTML = _opts.html;
				}

				// Add Class
				if( typeof _opts.class === "string" ){
					instance.addClass(_opts.class);
				}

				// Set everything else as an attribute
				for( var at in _opts ){
					if( _opts[at] ){
						instance._.setAttribute(at, _opts[at]);
					}
				}
			}
		}else{
			instance._ = el;
		}

		return instance;
	};
})();