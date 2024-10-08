from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response 
from rest_framework.views import APIView
from rest_framework import status 
from .models import Habits, Goals, User
from .serializers import HabitsSerializer, GoalSerializer, UserSerializer, InputDataSerializer
from .emailReminder import sendEmailReminder

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
        serializer.save()

class EmailReminderView(APIView):
    def post(self, request):
        serializer = InputDataSerializer(data=request.data)
        if serializer.is_valid():
            contents = {
                "reflection": serializer.validated_data['reflection'],
                "streak": serializer.validated_data['streak'],
                "goal": serializer.validated_data['goal'],
                "habits": serializer.validated_data['habits']
            }
            # Call your Python function here
            sendEmailReminder(contents)
            result = "Successfully Sent Email"
            return Response(result, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GoalsViewSet(viewsets.ModelViewSet):
    queryset = Goals.objects.all()
    serializer_class = GoalSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
