# Generated by Django 4.2 on 2024-09-16 20:54

import autoslug.fields
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Report",
            fields=[
                (
                    "pkid",
                    models.BigAutoField(
                        editable=False, primary_key=True, serialize=False
                    ),
                ),
                (
                    "id",
                    models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("title", models.CharField(max_length=255, verbose_name="Title")),
                (
                    "slug",
                    autoslug.fields.AutoSlugField(
                        editable=False, populate_from="title", unique=True
                    ),
                ),
                ("description", models.TextField(verbose_name="Description")),
            ],
            options={
                "verbose_name": "Report",
                "verbose_name_plural": "Reports",
                "ordering": ["-created_at"],
            },
        ),
    ]
