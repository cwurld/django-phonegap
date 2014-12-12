/**
 * Created by chuck on 12/27/13.
 *
 * Requires that the phone_connection object has been created.
 */

var make_get_access_token = function (url, phone_connection) {
    if (typeof phone_connection === 'undefined') {
        throw "phone_connection must be defined before make_get_access_token is called."
    }

    var get_access_token_template, priv_success_callback, priv_fail_callback;
    get_access_token_template = Handlebars.compile($("#login-template").html());

    return {
        submit: function (event) {
            event.preventDefault();
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var data = {username: username, password: password};

            var save_and_callback = function (data) {
                localStorage.setItem('token', data.token);
                priv_success_callback();
            };

            $.ajax({
                type: "POST",
                url: url,
                data: data
            })
                .done(save_and_callback)
                .fail(priv_fail_callback);
        },

        load_page: function (success_callback, fail_callback) {
            priv_success_callback = success_callback;
            priv_fail_callback = fail_callback;
            $('#main_panel').html(get_access_token_template());
            $('#login_form').submit(this.submit);
        },

        get_token: function (success_callback, fail_callback) {
            var deferred = $.Deferred();
            deferred.done(success_callback);
            deferred.fail(fail_callback);

            var token = localStorage.getItem("token");
            if (token != null) {
                deferred.resolve();
                return;
            }

            if (!phone_connection.has_connection()) {
                deferred.reject();
                return;
            }

            // If we get to here, then use a form to get token
            this.load_page(success_callback, fail_callback);
        }
    }
};
