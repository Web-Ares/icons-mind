( function(){

    $( function() {

        $.each( $( '.hero' ), function() {
            new  Hero( $( this ) );
        } );

        $( '.reviews__slider' ).each( function() {
            new ReviewsSlider( $( this ) );
        } );

        $( '.svg-icons__container' ).each( function() {
            new SvgIcons( $( this ) );
        } );

    } );

    var Hero = function ( obj ) {
        var _obj = obj,
            _window = $( window );

        var _onEvents = function() {

                _window.on( {
                    resize: function() {

                        _setHeight();

                    }
                } );

            },
            _setHeight = function() {

                if( _window.height() >= 500 ) {

                    _obj.css( {
                        height: _window.height()
                    } );

                } else {

                    _obj.css( {
                        height: '500px'
                    } );

                }

            },

            _init = function() {
                _setHeight();
                _onEvents();
            };

        _init();

    };

    var ReviewsSlider = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _slider = _obj;

        //private methods
        var _initSlider = function() {
                _slider = new Swiper('.swiper-container', {
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 30,
                    loop: true,
                    autoHeight: true
                } );
            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };

    var SvgIcons = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _twenty = _obj,
            _window = $(window);

        //private methods
        var _addEvents = function() {

                _window.on( {

                    load: function() {

                        _initMoveBLock();

                    }

                } );

            },
            _initMoveBLock = function() {

                _twenty.twentytwenty( {
                    default_offset_pct: 0.5
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

} )();