
from django.db import models
from django.utils.text import slugify
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User


# Create your models here.
class Note(models.Model):

    CATEGORY = (('BUSINESS', 'Business'),
                ('PERSONAL', 'Personal'),
                ('IMPORTANT', 'Important'))

    title = models.CharField(max_length=100)
    body = models.TextField()
    slug = models.SlugField(unique=True, blank=True, null=True)
    category = models.CharField(max_length=15, choices=CATEGORY, default="PERSONAL")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name='notes')
    

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            # Generate initial slug
            slug_base = slugify(self.title)
            slug = slug_base
            # Check if the slug is unique and modify it if necessary
            if Note.objects.filter(slug=slug).exists():
                slug = f'{slug_base}-{get_random_string(5)}'
            self.slug = slug
        super(Note, self).save(*args, **kwargs)
        
class Task(models.Model):
    id=models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name='tasks')
    catId=models.IntegerField(null=True,default=0)
    category=models.CharField(max_length=20)

    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.catId:
            cat=self.category
            if(self.category == "incomplete"):
                self.catId=1
            elif(self.category == "complete"):
                self.catId=2
            elif(self.category == "inreview"):
                self.catId=3
            elif(self.category == "backlog"):
                self.catId=4
        super(Task, self).save(*args, **kwargs)