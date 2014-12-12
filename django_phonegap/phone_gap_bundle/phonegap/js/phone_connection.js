/**
 * Created by chuck on 12/26/13.
 *
 * Requires: phonegap.js
 *           jquery
 *
 */

var make_phone_connection = function () {
    var pseudo_is_connected, on_connection;

    // If running from a non-mobile device, then Connection will be undefined.
    if( typeof Connection === 'undefined' ) {
        pseudo_is_connected = false;
    } else {
        pseudo_is_connected = null;
    }

    return {
        set_on_connection: function(handler){
            on_connection = handler;
        },

        get_connection: function(){
            if( typeof Connection != 'undefined' ) {
                return navigator.connection.type;
            } else {
                return 'not_mobile';
            }
        },

        has_connection: function(){
           if( pseudo_is_connected != null){
                return pseudo_is_connected;
            }

            if( typeof Connection != 'undefined' ) {
                return $.inArray(this.get_connection(), [Connection.ETHERNET, Connection.WIFI, Connection.CELL_2G,
                    Connection.CELL_3G, Connection.CELL_4G, Connection.CELL]) >= 0;
            } else {
                return false;
            }
        },

        toggle_pseudo_is_connected: function(){
            pseudo_is_connected = !pseudo_is_connected;
            if (pseudo_is_connected){
                message_manager.post_one();
                $("#online_toggle").html('Disconnect')
                on_connection();
            } else{
                $("#online_toggle").html('Connect')
            }
        }
    }
};