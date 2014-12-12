__author__ = 'Chuck Martin'

from django.conf.urls import patterns, url

from views import CreateMessage, ListMessages, CreateMessageREST


urlpatterns = patterns(
    '',
    url(r'^local/message/$', CreateMessage.as_view(), name='create_message'),
    url(r'^list_messages/$', ListMessages.as_view(), name='list_messages'),
    url(r'^rest/message/$', CreateMessageREST.as_view(), name='create_rest_message'),
)
