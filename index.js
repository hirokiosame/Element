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


	E.prototype.on = function on(eventName, eventCallback){
		this._.addEventListener(eventName, eventCallback, false);
		return this;
	};

	E.prototype.off = function off(eventName, eventCallback){
		this._.removeEventListener(eventName, eventCallback);
		return this;
	};

	E.prototype.one = function one(eventName, eventCallback){
		var self = this;
		return this.on(eventName, function(){
			self.off(eventName);
			eventCallback.apply(this, [].slice.apply(arguments));
		});
	};

	E.prototype.append = function append(arr){

		var args = arr instanceof Array ? arr : arguments;

		for( var i = 0; i < args.length; i++ ){
			this._.appendChild( args[i] instanceof E ? args[i]._ : args[i] );
		}

		return this;
	};

	E.prototype.text = function text(textContent){

		if( this._text ){
			this._text.textContent = textContent;
		}else{
			this._.textContent = textContent;	
		}

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
				if( typeof _opts._text === "string" ){

					instance._text = document.createElement(_opts._text);
					instance._.appendChild( instance._text );
				}

				// Inner text
				if( typeof _opts.text === "string" ){
					instance.text(_opts.text);
				}

				// Inner HTML
				if( typeof _opts.html === "string" ){
					instance._.innerHTML = _opts.html;
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