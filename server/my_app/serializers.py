# serializers.py
from rest_framework import serializers
from .models import Habits

class HabitListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        habits = [Habits(**item) for item in validated_data]
        return Habits.objects.bulk_create(habits)

class HabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habits 
        fields = '__all__'
        list_serializer_class = HabitListSerializer
