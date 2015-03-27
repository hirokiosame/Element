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

	E.prototype.append = function append(){

		var args = [].slice.apply(arguments);
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


	return function (el, opts){

		var instance = new E();

		// el is a string
		// Create it
		if( typeof el === "string" ){

			el = document.createElement(el);

			if( typeof opts === "object" ){

				var _opts = Object.create(opts);

				if( typeof _opts.text === "string" ){
					el.textContent = _opts.text;
					_opts.text = null;
				}

				if( typeof _opts._text === "string" ){

					instance._text = document.createElement(_opts._text);
					el.appendChild( instance._text );
				}

				for( var at in _opts ){
					if( _opts[at] ){
						el.setAttribute(at, _opts[at]);
					}
				}
			}
		}

		// el is an Element

		instance._ = el;


		return instance;
	};
})();