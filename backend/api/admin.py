from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(Student)
admin.site.register(Scholarship)
admin.site.register(University)
admin.site.register(Course)
admin.site.register(Notification)
admin.site.register(Message)
admin.site.register(Attachment)


