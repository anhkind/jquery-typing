#!/usr/bin/env python
# encoding: utf-8
"""
This file is used to make certain development tasks less annoying.

To take full advantage of it, you'll need Python, Fabric, Java, Ruby
and Haml.
"""

from os.path import dirname, join, realpath

from fabric.api import local


REPO_DIR = dirname(realpath(__file__))
DEMO_DIR = join(REPO_DIR, 'demo')
PLUGIN_DIR = join(REPO_DIR, 'plugin')

COMPILER_PATH = join(REPO_DIR, 'closure-compiler/compiler.jar')
PLUGIN_PATH = join(PLUGIN_DIR, 'jquery.typing.js')
COMPRESSED_PLUGIN_PATH = join(PLUGIN_DIR, 'jquery.typing.min.js')


def build():
    """
    Create compressed version of the plugin and build demo.
    """

    compress()
    demo()


def compress():
    """
    Create compressed version of the plugin.
    """

    local('java -jar {0} --js={1} --js_output_file={2}'.format(
          COMPILER_PATH, PLUGIN_PATH, COMPRESSED_PLUGIN_PATH))


def demo():
    """
    Build demo.
    """

    # copy compressed plugin
    local('cp {0} {1}'.format(COMPRESSED_PLUGIN_PATH, DEMO_DIR))

    # render haml
    haml = join(DEMO_DIR, 'demo.haml')
    html = join(DEMO_DIR, 'index.html')
    local('haml {0} > {1}'.format(haml, html))
