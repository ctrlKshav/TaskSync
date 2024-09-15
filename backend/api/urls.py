from django.urls import path
from . import views

urlpatterns = [
    path('notes/',views.NoteListCreate.as_view(),name="note-list"),
    path('notes/delete/<int:pk>/',views.NoteDelete.as_view(),name='delete-note'),
    path("notes/<slug:slug>", views.note_detail, name="note-detail"),
    path("notes-search/", views.search_notes, name='notes-search')
]