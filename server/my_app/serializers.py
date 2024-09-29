# serializers.py
from rest_framework import serializers
from .models import Habits, User, Goals

class HabitListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        habits = [Habits(**item) for item in validated_data]
        return Habits.objects.bulk_create(habits)

class HabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habits 
        fields = '__all__'
        list_serializer_class = HabitListSerializer


class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name')


class GoalListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        habits = [Goals(**item) for item in validated_data]
        return Goals.objects.bulk_create(habits)
    

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goals
        fields = "__all__"
        list_serializer_class = GoalListSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
