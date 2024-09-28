from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitsViewSet

router = DefaultRouter()
router.register(r'habits', HabitsViewSet, basename="habit")

# urlpatterns = [
#     path('api/', include(router.urls)),
# ]
urlpatterns = router.urls