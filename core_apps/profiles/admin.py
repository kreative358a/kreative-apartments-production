from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "gender", "occupation", "slug", "apartment_profile"] # , "apartment_profile"
    list_display_links = ["id", "user"]
    list_filter = ["occupation"]
