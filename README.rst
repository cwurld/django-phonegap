===============
django-phonegap
===============

.. image:: https://badge.fury.io/py/django-phonegap.png
    :target: http://badge.fury.io/py/django-phonegap
    
.. image:: https://travis-ci.org/cwurld/django-phonegap.png?branch=master
        :target: https://travis-ci.org/cwurld/django-phonegap

.. image:: https://pypip.in/d/django-phonegap/badge.png
        :target: https://crate.io/packages/django-phonegap?version=latest


django-phonegap is a demo showing how to make a Phonegap mobile app that communicates with a Django website via REST.

The motivation for this project was I create Django sites for data collection and analysis. Usually I use responsive
webpages (Bootstrap 3) for data entry so users can enter data using just about any device. However, some of my clients
 need to enter data from locations that do not have a network connection. This is where Phonegap comes in.

Phonegap is a framework that converts HTML5, CSS and javascript into native code for several mobile devices including
Apple IOS and Android.  I am not sure how difficult it is to precisely control the look of the app, but my customers
don't care about that. The apps I create a purely for data entry.

In this demo, I show how to create a Phonegap app that senses when mobile device has a network connection. If it does
not have one, it writes the form data to HTML5 localStorage. When a network connection is available, the data in
localStorage is automatically uploaded to the Django website using a REST API.

The reason this is a demo instead of a Django app is there are too many options to make a one-size-fits-all app.
If you are an experienced Django developer, you should have no trouble hacking this into something that fits
your requirements.

Phonegap: The Reality
---------------------
You can read about what PhoneGap aspires to be in the usual places. I will tell you the rest of the story. First,
the PhoneGap documentation (as of Jan 2014) is pretty bad. In addition to being wrong, it is schizophrenic, with
lots of residual Cordova documentation.

Next, when I was working on this code, the PhoneGap Debug Server went down for about 3 days (around Jan 1, 2014).
The message to users was just an HTTP 503 error. It was hard to tell if the problem was my code or their server.
Eventually I found a forum where others were complaining of the same problem. Turns out the server was down.
When I returned to the project a few days later, everything was working.

The upside is Phonegap is free-ish. It is free if you are willing to go through an seemly arduous install
process. Alternatively, you can use Adobe's web service service called PhoneGap Build. If you upload your
code from a public Github repo and make the resulting app publicly available, then PhoneGap Build is free.
You can also build one private app for free. If you want more private apps, you have to pay a monthly fee,
starting at $10/month (https://build.phonegap.com/plans). Interestingly, once your app is built, you no
longer need Phonegap Build. Thus it appears you can only pay for the months you are actively using Phonegap Build.
This works well for me because my apps are so simple. I doubt they will require frequent changes or bug fixes.


* Free software: BSD license
* Documentation: None

Status
--------
In Jan 2014, I had a lull in my schedule, so I started this project. A couple of weeks into it, I was pulled in another
direction. I have not looked at the project since then. I do not recall how far along I got. I am sure I had the
phone gap code on my phone communicating with the Django REST interface. I do not know if the code runs in its
current state.

Fast forward to Dec 2014. Some one asked me about Django REST. I said to look at my django-phonegap repo on Github.
That's when I discovered that I never posted my work. So I am posting it now. Let the user beware.


Python packages:

netifaces
django 1.5
djangorestframework


Edit get_LAN_ip_address()

