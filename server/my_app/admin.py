from django.contrib import admin

# Register your models here.
from .models import User, Goals, Habits
admin.site.register(User)
admin.site.register(Goals)
admin.site.register(Habits)
