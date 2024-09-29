from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitsViewSet, GoalsViewSet, UserViewSet

router = DefaultRouter()
router.register(r'habits', HabitsViewSet, basename="habit")
router.register(r'goals', GoalsViewSet, basename="goal")
router.register('users', UserViewSet, basename="user")
# urlpatterns = [
#     path('api/', include(router.urls)),
# ]
urlpatterns = router.urls
