# Generated by Django 4.2 on 2024-09-16 20:54

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Apartment",
            fields=[
                (
                    "available",
                    models.CharField(
                        auto_created=True,
                        choices=[("enabled", "enabled"), ("disabled", "disabled")],
                        default="enabled",
                        max_length=12,
                        verbose_name="Available",
                    ),
                ),
                (
                    "apartment_id",
                    models.CharField(
                        auto_created=True,
                        blank=True,
                        max_length=10,
                        null=True,
                        unique=True,
                        verbose_name="Apartment Id",
                    ),
                ),
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
                ("building", models.CharField(max_length=50, verbose_name="Building")),
                ("floor", models.PositiveIntegerField(verbose_name="Floor")),
                (
                    "unit_number",
                    models.CharField(max_length=12, verbose_name="Unit Number"),
                ),
            ],
            options={
                "ordering": ["apartment_id"],
            },
        ),
        migrations.CreateModel(
            name="ApartmentBase",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "apartments_base",
                    models.TextField(
                        blank=True,
                        default='{"Building-A": {"Floor-0": ["0-1 disabled", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}, "Building-B": {"Floor-0": ["0-1", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}, "Building-C": {"Floor-1": ["0-1", "0-2", "0-3", "0-4"], "Floor-2": ["1-1", "1-2", "1-3", "1-4"], "Floor-3": ["2-1", "2-2", "2-3", "2-4"], "Floor-4": ["3-1", "3-2", "3-3", "3-4"]}, "Building-D": {"Floor-0": ["0-1", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}, "Building-E": {"Floor-0": ["0-1", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}, "Building-F": {"Floor-0": ["0-1", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}}',
                        null=True,
                        verbose_name="Apartments BaseJson",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Apartments Base",
            },
        ),
    ]
