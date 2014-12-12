#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys


try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

if sys.argv[-1] == 'publish':
    os.system('python setup.py sdist upload')
    sys.exit()

readme = open('README.rst').read()
history = open('HISTORY.rst').read().replace('.. :changelog:', '')

setup(
    name='django-phonegap',
    version='0.1.0',
    description='django-phonegap is a demo showing how to make a phonegap mobile app that communicates with a Django website via REST.',
    long_description=readme + '\n\n' + history,
    author='Chuck Martin',
    author_email='cwurld@yahoo.com',
    url='https://github.com/cwurld/django-phonegap',
    packages=[
        'django-phonegap',
    ],
    package_dir={'django-phonegap': 'django-phonegap'},
    include_package_data=True,
    install_requires=[
    ],
    license="BSD",
    zip_safe=False,
    keywords='django-phonegap',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Natural Language :: English',
        'Programming Language :: Python :: 2.7',
    ],
    test_suite='tests',
)