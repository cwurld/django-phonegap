__author__ = 'Chuck Martin'

from django.forms import ModelForm

from models import Message


class MessageForm(ModelForm):
    class Meta:
        model = Message
        exclude = ('user', 'received')

    def __init__(self, *args, **kwargs):
        super(MessageForm, self).__init__(*args, **kwargs)
        self.fields['message'].widget.attrs['rows'] = 3
        self.fields['message'].widget.attrs['placeholder'] = 'Enter message'

        self.fields['priority'].widget.choices[0] = ('', 'Set Priority')



