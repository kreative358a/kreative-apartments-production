from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from core_apps.common.models import TimeStampedModel
from django.utils.text import slugify
from django.dispatch import receiver
from django.db.models.signals import pre_save
# from django_jsonform.models.fields import JSONField
import json
import threading
import time

request_local = threading.local()

def get_request():
    return getattr(request_local, 'request', None)

User = get_user_model()

apartments_base_string = '{"Building-A": {"Floor-0": ["0-1 disabled", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}, "Building-B": {"Floor-0": ["0-1", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}, "Building-C": {"Floor-1": ["0-1", "0-2", "0-3", "0-4"], "Floor-2": ["1-1", "1-2", "1-3", "1-4"], "Floor-3": ["2-1", "2-2", "2-3", "2-4"], "Floor-4": ["3-1", "3-2", "3-3", "3-4"]}, "Building-D": {"Floor-0": ["0-1", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}, "Building-E": {"Floor-0": ["0-1", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}, "Building-F": {"Floor-0": ["0-1", "0-2", "0-3", "0-4"], "Floor-1": ["1-1", "1-2", "1-3", "1-4"], "Floor-2": ["2-1", "2-2", "2-3", "2-4"], "Floor-3": ["3-1", "3-2", "3-3", "3-4"]}}'

def estate_to_object_dict(apartment_list):
    estate = {}
    for apartment in apartment_list:
        building, floor, number, available  = apartment
        if building not in estate:
            estate[building] = {}
        if str(floor) not in estate[building]:
            estate[building][str(floor)] = []

        estate[building][str(floor)].append(f'{number} {available}' if available == 'disabled' else number)
        
    return estate    

def actual_estate(apartments_list):
    actual_object_dict = estate_to_object_dict(apartments_list)
    for building in actual_object_dict.copy():
        for floor in actual_object_dict[building].copy():
            
            if len(actual_object_dict[building][floor]) == len([number for number in actual_object_dict[building][floor] if 'disabled' in number]):

                actual_object_dict[building][floor.replace(floor, f'{floor} disabled')] = actual_object_dict[building][floor]
                del actual_object_dict[building][floor]
                 

        if len(list(actual_object_dict[building].keys())) == len([floor for floor in list(actual_object_dict[building].keys()) if 'disabled' in floor]):
            actual_object_dict[building.replace(building, f'{building} disabled')] = actual_object_dict[building]
            del actual_object_dict[building] 
    
  
    estate_object_dict = json.loads(json.dumps(actual_object_dict, sort_keys=True)) 
    return estate_object_dict            
    # unique=True    
    
class ApartmentBase(models.Model):
    apartments_base = models.TextField(
        verbose_name=_("Apartments BaseJson"), 
        blank=True, 
        null=True,
        default=apartments_base_string
        # unique=True,
        )
 
    class Meta:
        verbose_name_plural = "Apartments Base"  
    def __str__(self) -> str:
        return self.apartments_base
    

class Apartment(TimeStampedModel):
    class Status(models.TextChoices):    
        YES = ("enabled", _("enabled"),)
        NO = ("disabled", _("disabled"),)    
    
    building = models.CharField(
        max_length=50,        
        verbose_name=_("Building"))
    
    floor = models.PositiveIntegerField(  
        verbose_name=_("Floor")
        ) 

    unit_number = models.CharField(
        max_length=12, 
        verbose_name=_("Unit Number")
    )                                   
         
    tenant = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="apartment",
        verbose_name=_("Tenant"),
    )

    
    apartment_id = models.CharField(
        auto_created=True,
        # editable=False,
        max_length=10, 
        null=True,
        blank=True, 
        unique=True,
        verbose_name=_("Apartment Id") 
        ) # unique=True
    
    available = models.CharField(
        max_length=12,
        auto_created=True,
        verbose_name=_("Available"), 
        choices=Status.choices,
        default=Status.YES)
    

    def __str__(self) -> str:
        return f"Building: {self.building} - Floor: {self.floor} - Unit: {self.unit_number} - Apartment ID: {self.apartment_id}" 
    
    class Meta:
        ordering = ["apartment_id"]
    
   
    # def create_list_apartment(self, *args, **kwargs):            
    #     try:
    #         apartments = Apartment.objects.all()
    #         if apartments.count() > 0:
    #         # if apartments.count() < 0:        
    #             apartments_list = [[f'Building-{a.building}', f'Floor-{a.floor}', f'{a.unit_number}', a.available] for a in apartments]
    #             estate_base_dict_object = actual_estate(apartments_list)
    #             estate_json_object = json.dumps(estate_base_dict_object, sort_keys=True)                    
    #             apartmentbase = ApartmentBase.objects.all()
                
    #             if apartmentbase.count() > 0:
    #                 apartmentbase = ApartmentBase.objects.all()[0]

    #                 apartmentbase.apartments_base = estate_json_object
    #                 apartmentbase.save()
    #             elif apartmentbase.count() == 0: 
    #                 ApartmentBase.objects.create(apartments_base=estate_json_object)
                    
    #         elif apartments.count() == 0:
    #             list_buildings = ["A", "B", "C", "D", "E", "F"]
    #             list_floors = [0, 1, 2, 3]
    #             list_numbers = ["1", "2", "3", "4"]
    #             for b in list_buildings:
    #                 for fl in list_floors:
    #                     for n in list_numbers:
    #                         Apartment.objects.create(building=b, floor=fl, unit_number=f"{fl}-{n}", apartment_id=f"{b}_{fl}_{fl}-{n}")
    #                         time.sleep(0.01)
    #             time.sleep(0.1)                            
    #             try:
    #                 apartments = Apartment.objects.all()
    #                 apartments_list = [[f'Building-{a.building}', f'Floor-{a.floor}', f'{a.unit_number}', a.available] for a in apartments]
    #                 estate_base_dict_object = actual_estate(apartments_list)
    #                 estate_json_object = json.dumps(estate_base_dict_object, sort_keys=True)                    
    #                 apartmentbase = ApartmentBase.objects.all()
                    
    #                 if apartmentbase.count() > 0:
    #                     apartmentbase = ApartmentBase.objects.all()[0]

    #                     apartmentbase.apartments_base = estate_json_object
    #                     apartmentbase.save()
    #                 else: 
    #                     ApartmentBase.objects.create(apartments_base=estate_json_object)
    #                     # print("apartmentbase.apartment_base =", apartmentbase.apartments_base)
    #             except Exception as e:
    #                 print(f"200. apartmennts Exception as {e}")                                  
    #                 # print("apartmentbase.apartment_base =", apartmentbase.apartments_base)
    #     except Exception as e:
    #         print(f"203. apartmennts Exception as {e}")    
            
                      
    def save(self, *args, **kwargs):

        try:
            if self.tenant != "" and self.tenant != None:   
                self.apartment_id = f"{self.building}_{self.floor}_{self.unit_number}"
                self.available = self.Status.NO
            elif self.tenant == "" or self.tenant == None: 
                self.available = self.Status.YES                
            super(Apartment, self).save(*args, **kwargs)
            # return super(Apartment, self).save(*args, **kwargs)
        except Exception as e:
            print("181 Exception as {e}")               
        
        try:            
            apartments = Apartment.objects.all()
            if apartments.count() > 0:
                apartments_list = [[f'Building-{a.building}', f'Floor-{a.floor}', f'{a.unit_number}', a.available] for a in apartments]
                estate_base_dict_object = actual_estate(apartments_list)
                estate_json_object = json.dumps(estate_base_dict_object, sort_keys=True)
                try:
                    apartmentbase = ApartmentBase.objects.all()
                    if apartmentbase.count() > 0:
                        apartmentbase = ApartmentBase.objects.all()[0]
                        apartmentbase.apartments_base = estate_json_object
                        apartmentbase.save()
                    else:
                        ApartmentBase.objects.create(apartments_base=estate_json_object)   
                        # print("apartmentbase.apartment_base =", apartmentbase.apartments_base)
                except Exception as e:
                    print(f"150. apartmennts Exception as {e}")                            
                                             
        except Exception as e:
            print(f"180. apartmennts Exception as {e}")  
            
# @receiver(pre_save, sender=Apartment)  
# def save_apartments_list(sender, instance, *args, **kwargs):                  
#     try:
#         apartments = Apartment.objects.all()
#         if apartments.count() > 0:
#         # if apartments.count() < 0:        
#             apartments_list = [[f'Building-{a.building}', f'Floor-{a.floor}', f'{a.unit_number}', a.available] for a in apartments]
#             estate_base_dict_object = actual_estate(apartments_list)
#             estate_json_object = json.dumps(estate_base_dict_object, sort_keys=True)                    
#             apartmentbase = ApartmentBase.objects.all()
            
#             if apartmentbase.count() > 0:
#                 apartmentbase = ApartmentBase.objects.all()[0]

#                 apartmentbase.apartments_base = estate_json_object
#                 apartmentbase.save()
#             elif apartmentbase.count() == 0: 
#                 ApartmentBase.objects.create(apartments_base=estate_json_object)
                
#         elif apartments.count() == 0:
#             list_buildings = ["A", "B", "C", "D", "E", "F"]
#             list_floors = [0, 1, 2, 3]
#             list_numbers = ["1", "2", "3", "4"]
#             for b in list_buildings:
#                 for fl in list_floors:
#                     for n in list_numbers:
#                         Apartment.objects.create(building=b, floor=fl, unit_number=f"{fl}-{n}", apartment_id=f"{b}_{fl}_{fl}-{n}")
#                         time.sleep(0.01)
#             time.sleep(0.1)                            
#             try:
#                 apartments = Apartment.objects.all()
#                 apartments_list = [[f'Building-{a.building}', f'Floor-{a.floor}', f'{a.unit_number}', a.available] for a in apartments]
#                 estate_base_dict_object = actual_estate(apartments_list)
#                 estate_json_object = json.dumps(estate_base_dict_object, sort_keys=True)                    
#                 apartmentbase = ApartmentBase.objects.all()
                
#                 if apartmentbase.count() > 0:
#                     apartmentbase = ApartmentBase.objects.all()[0]

#                     apartmentbase.apartments_base = estate_json_object
#                     apartmentbase.save()
#                 else: 
#                     ApartmentBase.objects.create(apartments_base=estate_json_object)
#                     # print("apartmentbase.apartment_base =", apartmentbase.apartments_base)
#             except Exception as e:
#                 print(f"200. apartmennts Exception as {e}")                                  
#                 # print("apartmentbase.apartment_base =", apartmentbase.apartments_base)
#     except Exception as e:
#         print(f"203. apartmennts Exception as {e}")      



# try:
#     apartments = Apartment.objects.all()
#     if apartments.count() > 0:
#     # if apartments.count() < 0:        
#         apartments_list = [[f'Building-{a.building}', f'Floor-{a.floor}', f'{a.unit_number}', a.available] for a in apartments]
#         estate_base_dict_object = actual_estate(apartments_list)
#         estate_json_object = json.dumps(estate_base_dict_object, sort_keys=True)                    
#         apartmentbase = ApartmentBase.objects.all()
        
#         if apartmentbase.count() > 0:
#             apartmentbase = ApartmentBase.objects.all()[0]

#             apartmentbase.apartments_base = estate_json_object
#             apartmentbase.save()
#         elif apartmentbase.count() == 0: 
#             ApartmentBase.objects.create(apartments_base=estate_json_object)
            
#     elif apartments.count() == 0:
#         list_buildings = ["A", "B", "C", "D", "E", "F"]
#         list_floors = [0, 1, 2, 3]
#         list_numbers = ["1", "2", "3", "4"]
#         for b in list_buildings:
#             for fl in list_floors:
#                 for n in list_numbers:
#                     Apartment.objects.create(building=b, floor=fl, unit_number=f"{fl}-{n}", apartment_id=f"{b}_{fl}_{fl}-{n}")
#                     time.sleep(0.01)
#         time.sleep(0.1)                            
#         try:
#             apartments = Apartment.objects.all()
#             apartments_list = [[f'Building-{a.building}', f'Floor-{a.floor}', f'{a.unit_number}', a.available] for a in apartments]
#             estate_base_dict_object = actual_estate(apartments_list)
#             estate_json_object = json.dumps(estate_base_dict_object, sort_keys=True)                    
#             apartmentbase = ApartmentBase.objects.all()
            
#             if apartmentbase.count() > 0:
#                 apartmentbase = ApartmentBase.objects.all()[0]

#                 apartmentbase.apartments_base = estate_json_object
#                 apartmentbase.save()
#             else: 
#                 ApartmentBase.objects.create(apartments_base=estate_json_object)
#                 # print("apartmentbase.apartment_base =", apartmentbase.apartments_base)
#         except Exception as e:
#             print(f"200. apartmennts Exception as {e}")                                  
#             # print("apartmentbase.apartment_base =", apartmentbase.apartments_base)
# except Exception as e:
#     print(f"203. apartmennts Exception as {e}")                     