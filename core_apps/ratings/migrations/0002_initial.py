# Generated by Django 4.2 on 2024-09-16 20:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("ratings", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="rating",
            name="rated_user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="received_ratings",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Rated User",
            ),
        ),
        migrations.AddField(
            model_name="rating",
            name="rating_user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="given_ratings",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Rating User",
            ),
        ),
    ]