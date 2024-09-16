from typing import Any
import json
from rest_framework import generics, status, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from core_apps.common.renderers import GenericJSONRenderer
from core_apps.profiles.models import Profile
from .models import Apartment, ApartmentBase, actual_estate
from .serializers import ApartmentSerializer, ApartmentSelectSerializer
from core_apps.profiles.serializers import UpdateProfileSerializer
import time
from django.db.models import F
from rest_framework import views, mixins
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied, ValidationError, NotFound

def create_list_apartment():            
    try:
        apartments = Apartment.objects.all()
        if apartments.count() > 0:
        # if apartments.count() < 0:                
            apartments_list = [[f'Building-{a.building}', f'Floor-{a.floor}', f'{a.unit_number}', a.available] for a in apartments]
            estate_base_dict_object = actual_estate(apartments_list)
            estate_json_object = json.dumps(estate_base_dict_object, sort_keys=True)                    
            apartmentbase = ApartmentBase.objects.all()
            
            if apartmentbase.count() > 0:
                apartmentbase = ApartmentBase.objects.all()[0]

                apartmentbase.apartments_base = estate_json_object
                apartmentbase.save()
            elif apartmentbase.count() == 0: 
                ApartmentBase.objects.create(apartments_base=estate_json_object)
                
        elif apartments.count() == 0:
            list_buildings = ["A", "B", "C", "D", "E", "F"]
            list_floors = [0, 1, 2, 3]
            list_numbers = ["1", "2", "3", "4"]
            for b in list_buildings:
                for fl in list_floors:
                    for n in list_numbers:
                        Apartment.objects.create(building=b, floor=fl, unit_number=f"{fl}-{n}", apartment_id=f"{b}_{fl}_{fl}-{n}")
                        time.sleep(0.01)
            time.sleep(0.1)                            
            try:
                apartments = Apartment.objects.all()
                apartments_list = [[f'Building-{a.building}', f'Floor-{a.floor}', f'{a.unit_number}', a.available] for a in apartments]
                estate_base_dict_object = actual_estate(apartments_list)
                estate_json_object = json.dumps(estate_base_dict_object, sort_keys=True)                    
                apartmentbase = ApartmentBase.objects.all()
                
                if apartmentbase.count() > 0:
                    apartmentbase = ApartmentBase.objects.all()[0]

                    apartmentbase.apartments_base = estate_json_object
                    apartmentbase.save()
                else: 
                    ApartmentBase.objects.create(apartments_base=estate_json_object)
                    # print("apartmentbase.apartment_base =", apartmentbase.apartments_base)
            except Exception as e:
                print(f"200. apartmennts Exception as {e}")                                  
                # print("apartmentbase.apartment_base =", apartmentbase.apartments_base)
    except Exception as e:
        print(f"203. apartmennts Exception as {e}")  

class ApartmentListAPIView(generics.ListCreateAPIView):
    serializer_class = ApartmentSerializer
    permission_classes = [permissions.AllowAny]
    renderer_classes = [GenericJSONRenderer]
    object_label = "apartments"

    def get_queryset(self):
        return Apartment.objects.all().order_by(
            "-apartment_id", "-tenant"
        )    

        
class ApartmentCreateAPIView(generics.CreateAPIView):
# class ApartmentCreateAPIView_(APIView):    
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    renderer_classes = [GenericJSONRenderer]
    object_label = "apartment"

    def post(self, request: Request, *args: Any, **kwargs: Any):
        try:
            create_list_apartment()
        except Exception as e:
            print(f"90 Exception as {e}")
        user = request.user
        # apartment_vals = request.data
        serializer = self.serializer_class(data=request.data)
        initial_vals = serializer.initial_data
        apartment_id_val = initial_vals["apartment_id"] if initial_vals["apartment_id"] != "" else f'{initial_vals["building"]}_{initial_vals["floor"]}_{initial_vals["unit_number"]}'
        # initial_vals = json.loads(request.body.decode("utf-8"))

        try:
            apartment_tenant = Apartment.objects.filter(tenant=request.user)
            apartment_exist = Apartment.objects.filter(apartment_id=apartment_id_val).first()
            
            if apartment_exist:
                print("apartment_exist =", apartment_exist)
                if apartment_exist.available == "disabled":
                    print('if apartment_exist.available == "disabled"')
                    raise PermissionDenied("This apartment is already rented by someone else")
                    # return Response(
                    #     {
                    #         "message": "This apartment is already rented by someone else"
                    #     },
                    #     status=status.HTTP_403_FORBIDDEN,
                    # )  
                elif apartment_exist.available == "enabled":
                    print('elif apartment_exist.available == "enabled":')
                    apartment_tenant.update(tenant="", available="enabled")                               
                

            elif not apartment_exist:
                # apartment_tenant = Apartment.objects.filter(tenant=request.user)
                print('elif not apartment_exist:')
                if apartment_tenant:
                    apartment_tenant.update(tenant="", available="enabled")
                
        except Exception as e:
            print(f"111. Exception as: {e} apartment {initial_vals}")
            

        
        if user.is_superuser or (
            hasattr(user, "profile")
            and user.profile.occupation == Profile.Occupation.TENANT
        ):
            try:
                apartment_user = Profile.objects.filter(user=request.user)
            except Exception as e:
                print(f"139. Exception as {e}")              
            try:
                apartment = Apartment.objects.filter(apartment_id=apartment_id_val)

                if apartment:
                    print(f"yes apartment {initial_vals}, {apartment_id_val}")
                    print(f"apartment.update {apartment_id_val}")
                    apartment = get_object_or_404(Apartment, apartment_id=apartment_id_val)
                    request.data["floor"] = int(initial_vals.get("floor"))
                    
                    request.data["apatment_id"] = apartment_id_val
                    request.data["available"] = "disabled" 
                    serializer = self.serializer_class(apartment, data=request.data, context={"request": request}) # context={"request": request} , data={"tenant": request.user, "available": "disabled"}
                    if serializer.is_valid():
                        serializer.save()   
                        # serializer_profile = UpdateProfileSerializer 
                        try:
                            apartment_user.update(apartment_profile=apartment_id_val)
                        except Exception as e:
                            print(f"146. Exception as {e}")     
                                       
                        return Response(
                            {"message": "Post upvoted successfully!"}, status=status.HTTP_200_OK
                        )    
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                elif not apartment:
                    print(f"elif not apartment {initial_vals}, {apartment_id_val}")
                    apartment_user.update(apartment_profile=apartment_id_val)
                    request.data["floor"] = int(initial_vals.get("floor"))
                    request.data["available"] = "disabled" 
                    return super().create(request, *args, **kwargs)
                
            except Exception as e:
                print(f"exception {e} creat apartment {initial_vals}, {apartment_id_val}")
                request.data["floor"] = int(initial_vals.get("floor"))
                request.data["available"] = "disabled" 
                return super().create(request, *args, **kwargs)               
                                
        else:
            return Response(
                {
                    "message": f"You are not allowed to create an apartment, you are not a tenant. Your occupation is {user.profile.occupation}"
                },
                status=status.HTTP_403_FORBIDDEN,
            )  

class ApartmentSelectAPIView(mixins.CreateModelMixin, mixins.UpdateModelMixin,
                    GenericAPIView):    
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    renderer_classes = [GenericJSONRenderer]
    object_label = "apartment"
    # lookup_field = "apartment_id"        

    def update(self, request: Request, *args: Any, **kwargs: Any):
        user = request.user
        try:
            # Apartment.objects.filter(tenant=request.user).update(tenant="", available="enabled")
            Apartment.objects.filter(tenant=request.user).update(tenant="", apartment_id=f"{F('apartment_id')[:-1]}y", available="enabled")

        except:
            pass          
        if user.is_superuser or (
            hasattr(user, "profile")
            and user.profile.occupation == Profile.Occupation.TENANT
        ):
            try:
                serializer = self.serializer_class(data=request.data)
                initial_vals = serializer.initial_data
                apartment = self.queryset.get(apartment_id=initial_vals["apartment_id"])
                if apartment:
                    pass

                    
            except Apartment.DoesNotExist:
                return super().create(request, *args, **kwargs)
        
        else:
            return Response(
                {
                    "message": f"You are not allowed to create an apartment, you are not a tenant. Your occupation is {user.profile.occupation}"
                },
                status=status.HTTP_403_FORBIDDEN,
            )  
          

class ApartmentDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ApartmentSerializer
    renderer_classes = [GenericJSONRenderer]
    object_label = "apartment"

    def get_object(self) -> Apartment:
        queryset = self.request.user.apartment.all()
        obj = generics.get_object_or_404(queryset)
        return obj
