from rest_framework import serializers
from .models import Apartment, ApartmentBase # ApartmentB
# from core_apps.profiles.serializers import ProfileSerializer

class ApartmentBaseSerializer(serializers.ModelSerializer):

    class Meta:        
        model = ApartmentBase
        fields = [
            "apartments_base",           
            ]

class ApartmentSerializer(serializers.ModelSerializer):
    tenant = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Apartment
        fields = [
           "building",
           "floor",
           "unit_number",
           "apartment_id",
           "available",
           "tenant"
        ]
               
        
class ApartmentSelectSerializer(serializers.ModelSerializer):
    tenant = serializers.HiddenField(default=serializers.CurrentUserDefault()) 
    class Meta:
        model = Apartment
        fields = [
           "building",
           "floor",
           "unit_number",
           "apartment_id",
           "available",
           "tenant"
        ]  
    def create(self, validate_data):
        return Apartment.objects.create(**validate_data)
                  
    def update(self, instance, validated_data):
        instance.tenant = validated_data.get('tenant', instance.tenant)
        instance.available = validated_data.get('available', instance.available)
        instance.save()
        return instance  
             
# class SelectApartmentSerializer(serializers.ModelSerializer):
#     tenant = serializers.HiddenField(default=serializers.CurrentUserDefault())
#     class Meta:
#         model = Apartment
#         fields = [
#            "building",
#            "floor",
#            "unit_number",
#            "apartment_id",
#            "available",
#            "tenant"
#         ]        
