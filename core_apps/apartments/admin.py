from django.contrib import admin
from .models import Apartment, ApartmentBase
@admin.register(ApartmentBase)
class ApartmentBaseAdmin(admin.ModelAdmin):
    list_display = ["id", "apartments_base"]

@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ["id", "apartment_id", "building", "unit_number", "floor", "tenant", "available"]
    list_display_links = ["id", "apartment_id"]
    list_filter = ["building", "floor"]
    search_fields = ["unit_number"]
    autocomplete_fields = ["tenant"]
    
