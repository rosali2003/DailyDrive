from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitsViewSet, EmailReminderView

router = DefaultRouter()
router.register('habits', HabitsViewSet, basename='habits')
urlpatterns = [path('emailReminder/', EmailReminderView.as_view())] + router.urls