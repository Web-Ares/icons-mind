"use strict";
( function(){

    $( function() {

        $.each( $( '.drop-menu' ), function() {
            new  Menu( $( this ) );
        } );

        $.each( $( '.message-field' ), function() {
            new MessageHigh( $( this ) );
        } );

        $(document).on( 'invalid.wpcf7' , function () {
            $( '.contact-us__form' ).find( 'fieldset' ).removeClass( 'novalid' );
            $( '.contact-us__form' ).find( '.wpcf7-not-valid-tip' ).each( function() {
                $( this ).parents( 'fieldset' ).addClass( 'novalid' );
            })
        });

        $.each($('#mc-embedded-subscribe-form'), function () {
            new MC($(this));
        });

    } );

    var MC = function ( obj ) {
        var _obj = obj,
            _thankpage = obj.data( 'thank' ),
            _data_action = $('.promo_inner').data('action'),
            _mail = '';
        var _onEvents = function () {
                _obj.on( 'submit' , function () {
                    _mail = $( '#mce-EMAIL' ).val();
                    if ( _mail.length < 4 ) {
                        _setError();
                    } else {
                        $( '#mce-EMAIL' ).removeClass( 'mce_inline_error' );
                        _send();
                    }
                    return false;
                });
            },
            _setError = function () {
                $( '#mce-EMAIL' ).addClass( 'mce_inline_error' );
            },
            _send = function () {
                $.ajax({
                    url: _data_action,
                    data: { 'EMAIL': _mail, "action" : 'mchimp'},
                    type: 'POST',
                    dataType: 'json',
                    success: function (resp) {
                        if ( resp.result == 'success' ) {
                            _obj[ 0 ].reset( );
                            window.location.href = _thankpage;
                        } else {
                            _setError();
                        }
                    },
                    error: function () {
                        _setError();
                    }
                });

            },
            init = function () {
                _onEvents();
            };

        init()
    };
    
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

                            setTimeout( function() {

                                if( _site.height() > _window.height() ) {
                                    _dom.css( {
                                        'overflow-y': ''
                                    } );
                                }

                                _window.scrollTop( siteScrollTop );

                                $( _menuContent ).getNiceScroll().hide();

                            }, 10);


                        } else {

                            _header.addClass( 'site__header_drop-menu' );

                            siteScrollTop = _window.scrollTop();
                            _header.removeClass('site__header_fixed-white');

                            setTimeout( function() {

                                if( _site.height() > _window.height() ) {
                                    _dom.css( {
                                        'overflow-y': 'scroll'
                                    } );
                                }

                                setTimeout( function() {

                                    _site.css( {
                                        'height': '100%'
                                    } );

                                    _initContentScroll();

                                }, 10);

                                setTimeout( function() {

                                    $( _menuContent ).getNiceScroll().show();
                                    $( _menuContent ).getNiceScroll().resize();

                                }, 310);

                            }, 300);

                        }

                        return false;

                    }
                } );
                _window.on( {
                    scroll: function () {

                        _action = _window.scrollTop() >= _header.innerHeight();

                        if( _action ) {
                            _header.addClass('site__header_fixed-white');
                        }
                        else {
                            _header.removeClass('site__header_fixed-white');
                        }

                    },
                    load: function() {

                        if( _action ) {
                            _header.addClass('site__header_fixed-white');
                        }
                        else {
                            _header.removeClass('site__header_fixed-white');
                        }

                    },
                    DOMMouseScroll: function ( e ) {

                        var delta = e.originalEvent.detail;

                        if ( delta ) {

                            var direction = ( delta > 0 ) ? 1 : -1;

                            _checkScroll( direction );

                        }

                    },
                    mousewheel: function ( e ) {

                        var delta = e.originalEvent.wheelDelta;

                        if ( delta ) {

                            var direction = ( delta > 0 ) ? -1 : 1;

                            _checkScroll( direction );

                        }

                    },
                    touchmove: function ( e ) {

                        var currentPos = e.originalEvent.touches[0].clientY;

                        if ( currentPos > _lastPos ) {

                            _checkScroll( -1 );

                        } else if ( currentPos < _lastPos ) {

                            _checkScroll( 1 );

                        }
                        _lastPos = currentPos;

                    },
                    keydown: function ( e ) {

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

    var MessageHigh = function ( obj ) {

        var _obj = obj,
            _message = _obj.find( 'textarea.contact-us__form__message' ),
            _messageText = _obj.find( '.message-field__text' ),
            _messageHeight = _obj.find( '.message-field__height' );

        var _onEvents = function() {

                _obj.on( {
                    'keydown' : function() {

                        _messageText.html( _message.val() + '___' );
                        _message.css( 'height', _messageText.height() + 25 );
                        _messageHeight.css( 'height', _messageText.height() );

                    }
                } );

            },

            _init = function() {
                _onEvents();
            };

        _init();
    };

} )();