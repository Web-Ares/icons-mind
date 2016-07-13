"use strict";
( function(){

    $( function() {

        $.each( $( '.drop-menu' ), function() {
            new  Menu( $( this ) );
        } );

    } );

    var Menu = function ( obj ) {
        var _obj = obj,
            _btn = $( '.site__header__menu-btn' ),
            _header = $( '.site__header'),
            _menuInner = _obj.find( '.drop-menu__inner' ),
            _menuContent = _obj.find( '#scroll-wrap' ),
            _action = false,
            _lastPos,
            siteScrollTop,
            _site = $('.site'),
            _dom = $( 'html' ),
            _window = $( window );

        var _onEvents = function() {

                _btn.on( {
                    click: function() {

                        if( _header.hasClass( 'site__header_drop-menu' ) ) {

                            _header.removeClass( 'site__header_drop-menu' );

                            _site.css( {
                                'height': ''
                            } );

                            _window.scrollTop( siteScrollTop );

                            _dom.css( {
                                'overflow-y': ''
                            } );

                            $( _menuContent ).getNiceScroll().hide();

                        } else {

                            _header.addClass( 'site__header_drop-menu' );

                            siteScrollTop = _window.scrollTop();

                            setTimeout( function() {

                                _site.css( {
                                    'height': '100%'
                                } );

                                _dom.css( {
                                    'overflow-y': 'scroll'
                                } );

                                _initContentScroll();

                                setTimeout( function() {

                                    $( _menuContent ).getNiceScroll().show();
                                    $( _menuContent ).getNiceScroll().resize();

                                }, 300);

                            }, 300);


                        }

                        return false;

                    }
                } );
                _window.on( {
                    'scroll': function () {
                        _action = _window.scrollTop() >= _header.innerHeight();

                    },
                    'DOMMouseScroll': function ( e ) {

                        var delta = e.originalEvent.detail;

                        if ( delta ) {

                            var direction = ( delta > 0 ) ? 1 : -1;

                            _checkScroll( direction );

                        }

                    },
                    'mousewheel': function ( e ) {

                        var delta = e.originalEvent.wheelDelta;

                        if ( delta ) {

                            var direction = ( delta > 0 ) ? -1 : 1;

                            _checkScroll( direction );

                        }

                    },
                    'touchmove': function ( e ) {

                        var currentPos = e.originalEvent.touches[0].clientY;

                        if ( currentPos > _lastPos ) {

                            _checkScroll( -1 );

                        } else if ( currentPos < _lastPos ) {

                            _checkScroll( 1 );

                        }
                        _lastPos = currentPos;

                    },
                    'keydown': function ( e ) {

                        switch( e.which ) {

                            case 32:
                                _checkScroll( 1 );
                                break;
                            case 33:
                                _checkScroll( -1 );
                                break;
                            case 34 :
                                _checkScroll( 1 );
                                break;
                            case 35 :
                                _checkScroll( 1 );
                                break;
                            case 36 :
                                _checkScroll( -1 );
                                break;
                            case 38:
                                _checkScroll( -1 );
                                break;
                            case 40:
                                _checkScroll( 1 );
                                break;

                            default:
                                return;
                        }

                    }
                } )
            },
            _checkScroll = function( direction ) {

                if( direction > 0 && !_header.hasClass( 'site__header_hidden' ) && _action && !_header.hasClass( 'site__header_drop-menu' ) ) {
                    _header.addClass( 'site__header_hidden' );
                }

                if( direction < 0 && _header.hasClass( 'site__header_hidden' ) && _action ) {
                    _header.removeClass('site__header_hidden');
                }

            },
            _initContentScroll = function() {

                $( _menuContent ).niceScroll( {
                    autohidemode: 'false',
                    cursorborder: '',
                    cursorcolor: "#fff",
                    cursorwidth: "6px",
                    cursorborderradius: "0"
                } );

            },
            _init = function() {
                _onEvents();
            };

        _init();

    };

} )();