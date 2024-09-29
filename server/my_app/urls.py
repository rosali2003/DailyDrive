from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitsViewSet, EmailReminderView

router = DefaultRouter()
router.register(r'habits', HabitsViewSet, basename="habit")
# router.register('emailReminder', EmailReminderView.as_view())

urlpatterns = [
    path(r'emailReminder', EmailReminderView.as_view()),
]
urlpatterns = router.urls