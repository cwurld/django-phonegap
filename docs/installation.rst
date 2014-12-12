============
Installation
============
Install Packages
----------------
Since this is a demo, the installation is not the same as a normal Python package. Rather, just download the repository, unpack it and copy the directory "django_phonegap" to a convenient place. That directory is a complete Django website.

In addition, you will need to install the packages that this website requires. I prefer installing them in a virtualenv. If you are not familiar with virtualenv, I highly recommend that you look into it. In any case, you need to have pip installed. Then here are the packages you need to install::

	$ pip install django==1.5

	$ pip install djangorestframework==2.3.10

	$ pip install netifaces==0.8

It is likely that the code will work with other versions, but I have not tested them.

Next, cd into the django_phonegap directory and create the database. During this process you will be asked if you want to create a superuser account. Say yes and respond to the prompts. The command to create the database is::

	$ python manage.py syncdb

.. _lan_ip:

LAN IP Address
--------------
Later we will be having the mobile device communicate with the Django development server over your LAN. To make that work, we need the LAN IP address of the computer that will run the development server. In an attempt to make that easier for you, I wrote the function /django_phonegap/data_port/get_LAN_ip_address.py  I have only tested that function on Ubuntu 12.04. You should run the function on your machine to see it if works properly. If not you will need to write a function that works for your machine. 

When this project was in the earliest stage, I just used the Linux ifconf command to get the IP address and then added it to my code as a constant. In my experience, that IP address did not change when I restarted my computer or my LAN. Thus for me, an alternative version of get_LAN_ip_address.py would be::

	def get_LAN_ip_address():
	    return '192.168.0.64:8800'

No doubt this is hacky, but it's only form testing and debugging. If you morph this project into something you put on a production server, the IP address of that server will be a constant that you can hard-code in.

If you use this code as the basis of your project, make sure to change the SECRET_KEY in settings.py.



