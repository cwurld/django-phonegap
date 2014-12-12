__author__ = 'Chuck Martin'

import os
import shutil

from django.core.management.base import BaseCommand
from django.conf import settings
from django.template.loader import render_to_string

from data_port.forms import MessageForm
from data_port.get_LAN_ip_address import get_LAN_ip_address


class Command(BaseCommand):
    help = 'Makes a zipfile that can be posted to PhoneGap Build.'

    def handle(self, *args, **options):
        destination_dir = os.path.join(settings.SITE_PATH, 'phone_gap_bundle')
        if os.path.exists(destination_dir):
            shutil.rmtree(destination_dir)
        os.mkdir(destination_dir)

        # Build the page using the same template we used to render it to a web-page during local tests
        form = MessageForm()
        lan_ip_address = 'http://' + get_LAN_ip_address()
        rendered = render_to_string('data_port/message_form.html',
                                    {'STATIC_URL': '',
                                     'form': form,
                                     'IS_PHONEGAP': True,
                                     'LAN_IP_ADDRESS': lan_ip_address})
        fp = open(os.path.join(destination_dir, 'index.html'), 'w')
        fp.write(rendered)
        fp.close()

        # Copy the static files
        shutil.copytree(os.path.join(settings.SITE_PATH, 'static', 'phonegap'),
                        os.path.join(destination_dir, 'phonegap'))
        shutil.copyfile(os.path.join(settings.SITE_PATH, 'data_port', 'config.xml'),
                        os.path.join(destination_dir, 'config.xml'))

        # Zip it up and return it
        shutil.make_archive(destination_dir, 'zip', destination_dir)
        print 'Your zip file is at: ', destination_dir + '.zip'
