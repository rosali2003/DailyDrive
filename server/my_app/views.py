from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response 
from rest_framework import status 
from .models import Habits 
from .serializers import HabitsSerializer

class HabitsViewSet(viewsets.ModelViewSet):
    queryset = Habits.objects.all()
    serializer_class = HabitsSerializer

    def create(self, request, *args, **kwargs):
        # Check if the request contains a list (bulk create)
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
<<<<<<< HEAD
        serializer.save()
=======
        serializer.save()
>>>>>>> 0f8fd63 (django set up complete and bulk add habits)
