# Generated by Django 4.2 on 2024-09-16 17:29

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("apartments", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Issue",
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
                ("title", models.CharField(max_length=255, verbose_name="Issue Title")),
                ("description", models.TextField(verbose_name="Issue Description")),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("reported", "Reported"),
                            ("resolved", "Resolved"),
                            ("in_progress", "In Progress"),
                        ],
                        default="reported",
                        max_length=20,
                        verbose_name="Status",
                    ),
                ),
                (
                    "priority",
                    models.CharField(
                        choices=[
                            ("low", "Low"),
                            ("medium", "Medium"),
                            ("high", "High"),
                        ],
                        default="low",
                        max_length=20,
                        verbose_name="Priority",
                    ),
                ),
                (
                    "resolved_on",
                    models.DateField(blank=True, null=True, verbose_name="Resolved On"),
                ),
                (
                    "apartment",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="issues",
                        to="apartments.apartment",
                        verbose_name="Apartment",
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at", "-updated_at"],
                "abstract": False,
            },
        ),
    ]
