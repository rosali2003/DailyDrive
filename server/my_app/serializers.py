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

class InputDataSerializer(serializers.Serializer):
    reflection = serializers.CharField(max_length=1000)
    streak = serializers.IntegerField(max_value=100, min_value=-100)
    goal = serializers.CharField(max_length=200)
    habits = serializers.ListField(child=serializers.CharField(max_length=1000))

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
