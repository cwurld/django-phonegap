__author__ = 'Chuck Martin'

from django.views.generic.edit import CreateView
from django.views.generic import ListView

from rest_framework import generics
from rest_framework import permissions
from serializers import MessageSerializer

from models import Message
from forms import MessageForm


class CreateMessage(CreateView):
    """
    For testing the message form before turning it into a PhoneGap app.
    """
    model = Message
    form_class = MessageForm

    def get_context_data(self, **kwargs):
        kwargs = super(CreateMessage, self).get_context_data(**kwargs)
        kwargs['IS_PHONEGAP'] = False
        return kwargs


class ListMessages(ListView):
    model = Message


class CreateMessageREST(generics.ListCreateAPIView):
    """
    For receiving Message form data from mobile device.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def pre_save(self, obj):
        obj.user = self.request.user
