__author__ = 'Chuck Martin'

import netifaces


def get_LAN_ip_address():
    """
    This gets the LAN IP address (e.g. 192.168.?.?)  of the machine running the Django dev server.

    This code works on Ubuntu 12.04. You may need to re-write it to work on your machine.
    """
    return netifaces.ifaddresses('eth0')[netifaces.AF_INET][0]['addr'] + ':8800'


if __name__ == '__main__':
    print get_LAN_ip_address()