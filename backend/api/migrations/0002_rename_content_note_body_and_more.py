# Generated by Django 5.1 on 2024-09-14 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="note",
            old_name="content",
            new_name="body",
        ),
        migrations.RenameField(
            model_name="note",
            old_name="created_at",
            new_name="created",
        ),
        migrations.AddField(
            model_name="note",
            name="category",
            field=models.CharField(
                choices=[
                    ("BUSINESS", "Business"),
                    ("PERSONAL", "Personal"),
                    ("IMPORTANT", "Important"),
                ],
                default="PERSONAL",
                max_length=15,
            ),
        ),
        migrations.AddField(
            model_name="note",
            name="slug",
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="note",
            name="updated",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
