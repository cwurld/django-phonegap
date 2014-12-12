/**
 * Created by chuck on 12/27/13.
 *
 * Accepts new messages. Posts messages to server when there is a network connection.
 *
 * Messages are stored in localStorage with keys of the form "message_datetime".
 *
 * phone_connection and get_access_token should be defined.
 *
 */

var make_message_manager = function (url, phone_connection, get_access_token) {
    if (typeof phone_connection === 'undefined') {
        throw "phone_connection must be defined before make_message_manager is called."
    }

    if (typeof get_access_token === 'undefined') {
        throw "get_access_token must be defined before make_message_manager is called."
    }

    var get_message_template, saved_message_template, get_one, post_one, load_page_callback, save_message;
    get_message_template = Handlebars.compile($("#message-template").html());
    saved_message_template = Handlebars.compile($("#message-saved-template").html());

    get_one = function() {
        // Gets the key of one message
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var parts = key.split('_');
            if (parts[0] === 'message') {
                return key
            }
        }
        return null;
    };

    save_message = function (ev) {
        // Form submit handler
        ev.preventDefault();
        var now = new Date();
        var key = 'message_' + now.toString();
        var message = $('#message_form').serialize();
        localStorage.setItem(key, message);
        post_one();
        $('#main_panel').html(saved_message_template());
        setTimeout(load_page_callback, 1500);
    };

    load_page_callback = function () {
        $('#main_panel').html(get_message_template());
        //$('#message_form').submit(save_message);
    };

    post_one = function () {
        var key, token, message, success_callback, fail_callback;

        console.debug('Start post one');

        if (!phone_connection.has_connection()) {
            console.debug('No connection');
            return;
        }

        // If the cache is empty then return
        key = get_one();
        if (key === null) {
            console.debug('Cache is empty');
            return;
        }

        // Make sure user has access token
        token = localStorage.getItem("token");
        if (token === null) {
            get_access_token.get_token(function(){post_one(); load_page_callback();}, load_page_callback);
            console.debug('Getting access token');
            return;
        }

        // Get a message
        message = localStorage.getItem(key);
        localStorage.removeItem(key);
        success_callback = function () {
            window.setTimeout(post_one, 500);   // Limits posts to every 500 ms
        };

        fail_callback = function (data) {
            localStorage.setItem(key, message);
            window.setTimeout(post_one, 500);   // Limits posts to every 500 ms
        };

        // Post message
        console.debug('Starting ajax to: '+url);
        $.ajax({
            type: "POST",
            url: url,
            data: message,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Token " + token);
            }
        })
            .done(success_callback)
            .fail(fail_callback);
    };

    return {
        load_page_callback: load_page_callback,
        post_one: post_one,
        save_message: save_message
    }
};
