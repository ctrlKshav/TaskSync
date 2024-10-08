﻿from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note,Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs = {'password':{"write_only" : True}}
    
    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "body",'author', "slug", "category", "created", "updated"]

        extra_kwargs = {'author' : {'read_only':True}}
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id","title","author","category","created","catId"]
        extra_kwargs = {'author' : {'read_only':True} }
        
        