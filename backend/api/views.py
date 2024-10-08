from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics

from rest_framework.permissions import  IsAuthenticated,AllowAny
from .serializers import UserSerializer,NoteSerializer,TaskSerializer
from .models import Note,Task

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q
from rest_framework import status



# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# @api_view(["GET", "POST"])
# def notes(request):
#     if request.method == "GET":
#         notes = Note.objects.all()
#         serializer = NoteSerializer(notes, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = NoteSerializer(data=request.data,author=request.user)
#         if serializer.is_valid():   
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoteDelete(generics.DestroyAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return Note.objects.filter(author=user)
    
    

@api_view(['GET'])
def search_notes(request):
    query = request.query_params.get("search")
    notes = Note.objects.filter((Q(title__icontains=query) | Q(body__icontains=query) | Q(category__icontains=query)), author=request.user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT', 'DELETE'])
def note_detail(request, slug): 
    try:
        note = Note.objects.get(slug=slug,author=request.user)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskListCreate(generics.ListCreateAPIView):
    serializer_class=TaskSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return Task.objects.filter(author=user)

    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

            
@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request,pk): 
    try:
        print(pk)
        task = Task.objects.get(id=pk,author=request.user)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# def google_login(request):
#     token = request.POST.get('token')
#     try:
#         idinfo = id_token.verify_oauth2_token(token, requests.Request(), "949219434705-3u7ck2qs7tagoi7knmlpd6l80t1vtg5b.apps.googleusercontent.com")

#         # Extract user information (e.g., email, name, Google ID)
#         user_google_id = idinfo['sub']
#         email = idinfo['email']

#         # Create a session or user in your app
#         # ...

#         return JsonResponse({'message': 'User authenticated successfully'})

#     except ValueError:
#         return JsonResponse({'message': 'Invalid token'}, status=400)
