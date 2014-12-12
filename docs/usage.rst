==================
Exploring the Demo
==================

Running it Local
----------------
This project was designed based on the assumption that the most challenging part would be debugging the PhoneGap app, running on a mobile device. By comparison, writing the Django website and getting the REST interface would be pretty straight forward.

Since the PhoneGap app is built from HTML, CSS and Javascript, it is possible to test the app as an ordinary web-page, before converting it to a mobile app running on a mobile device. You can see this web-page by starting the Django development server::

$ python manage.py runserver

and opening your favorite browser to http://127.0.0.1:8000/.

Speaking of browsers, I am assuming you already some sort of developer tools (e.g. Firebug) installed on yours. If you do not already have this, you will want to add a plugin to allow you to inspect localStorage. I am using FireStorage Plus. 

When you fire up your browser and point it to http://127.0.0.1:8000, you should see a web-page with two links. The first one is `Test Locally <http://127.0.0.1:8000/data_port/local/message/>`_. Click on that. You should see a web-page with form that lets you enter a message along with a priority. Below that is a box for simulating establishing a network connection or breaking one. If you enter a message and priority and click save, you should see the message being stored in localStorage.

Click the connect button and you will be asked to login. We are using Django Rest framework `TokenAuthentication`_. In order to upload you message to the server, you first need to obtain an authorization token by entering your username and password and clicking on "Sign In". If all goes well a you should see a message like this on the Django development server console::

	POST /api-token-auth/ HTTP/1.1" 200 53

and you should see the token in localStorage.

.. _TokenAuthentication: http://www.django-rest-framework.org/api-guide/authentication#tokenauthentication

Once you have an access token and a (simulated) network connection, the Javascript on the webpage will start sending the messages in localStorage to the server. On the Django development server console you should see something like this::

	POST /data_port/rest/message/ HTTP/1.1" 201 88

At the same time the messages are removed from localStorage. 

If you open another browser window and point it at http://127.0.0.1:8000/data_port/list_messages/, you can see the messages as they arrive at the server.

Of course this is not as exciting as it could be because (hopefully) everything is working. But when you build your own app, things might not work right away. By running the PhoneGap app from a web-page on the server, you have access to the full arsenal of server-side and client-side debugging tools.

The Web Page Design
----------------------------
The web-page that will eventually become the PhoneGap app uses a "Single Page" design. Instead of having separate web-pages for each function, a single page web-page contains the content for multiple pages and swaps out parts of the DOM for each "page". Evidently, this is the preferred way to design PhoneGap apps. This design comes from an `excellent tutorial  <http://coenraets.org/blog/phonegap-tutorial/>`_ by Christophe Coenraets. This tutorial guides you through the creation of an app this is much richer than the one in this project, with great explanations along the way. If you are new to PhoneGap you will find this tutorial invaluable.

Building the PhoneGap App
-------------------------

Now that everything is working from a web-page, its time to turn it into an app and put it on your mobile device. To do that, run the :mod:`settings` :mod:`threading` :class:`data_port.views.CreateMessage` custom Django command::

	$ python manage.py bundle_phonegap

This command creates a directory, renders the web-page into a file in that directory, copies all the static files and creates the zip file you need to create your app on PhoneGap Build. 

To use PhoneGap Build, first create an account on `PhoneGap Build`_. Next, on the PhoneGap build page, go to settings and enable debugging. Then upload the zip file and build it. Install it on your mobile device using the QR code shown on the PhoneGap Build webpage.

.. _PhoneGap Build: https://build.phonegap.com/

To test the app on your mobile device, the Django site must be running on a network that your phone has access to. One easy way to do that is have your mobile device communicate with the Django development server over your LAN. For this to work, your phone needs to know the LAN address of the computer running the Django development server (see :ref:`lan_ip` in the installation section).

Now connect your mobile device to your LAN (I use Wi-Fi). And start the development server using this command::

	$ python manage.py runserver 0.0.0.0:8800

You can confirm it is running by pointing your browser at the IP address of the development server. Something like::

	192.168.?.???:8800

You should see the same home page you saw when you were testing the code via the web browser. 

Back to your mobile device. Start the app. What you see depends on whether or not you have a network connection and whether or not your device has an access token in localStorage. If it has a network connection and no access token, then it will ask you to login.

Since we are still running from the development server, we still have all the server side debugging tools at our finger tips. However, we no longer can use our browser based debugging tools. Luckily, PhoneGap Build has a passable substitute. If you build the app with debug on, you can now debug the client side by clicking on the Debug button on the PhoneGap Build page web-page. 

However, before you dive into PhoneGap debug there are a few gothchas you should be aware of. First, if you google PhoneGap Debug, you will see instructions telling you to add::

	<script src="http://debug.phonegap.com/target/target-script-min.js#my_secret_key"></script>

Don't do that if you are running PhoneGap debug from the PhoneGap Build web-page. PhoneGap Build adds that for you. 

Next, on some browsers (FireFox), when you go to the PhoneGap Build debug page, you will see a button for debugging scripts. Rock and Roll!!! It was just what I needed. Except it does not work.

At this point, you might be thinking "at least I have console.debug()". Problem is that functionality is not a default. You need to tell PhoneGap Build to include it. The way you accomplish this is via the `conf.xml file`_. Become familiar with this file, because you will need to add to it if you want to take advantage of additional functionality. 

Unfortunately the docs for adding functionality to conf.xml are somewhat of a mess. There is a lot of carry over from the Cordova documents. Through a lot of Googling I was able to get something that works. You can inspect it at:: 

	/django_phonegap/data_port/config.xml.

.. _conf.xml file: http://docs.build.phonegap.com/en_US/2.9.0/configuring_basics.md.html#The%20Basics

Back to playing with the demo on your mobile device. If you have a network connection and an access token, then messages you enter will be transmitted to the server immediately. You can see them by opening a browser window to::

	192.168.?.???:8800/data_port/list_messages/

If you put your mobile device into airplane mode, then messages will be stored on the mobile device until a connection can be made with the server.

Validation
----------
One cool thing about Django-REST is that when data is posted it is run through normal form validation and if there are errors, they are sent back to the client. No doubt this is very useful in most cases. However, for this app, it maybe hours between when the user saves the form and when it's posted. Thus validation is done on the client side.

I am using `validate.js`_. I have not used this Javascript module before. But it works and is easy to use.

.. _validate.js: http://rickharrison.github.io/validate.js/













