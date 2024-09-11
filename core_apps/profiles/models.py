from autoslug import AutoSlugField
from cloudinary.models import CloudinaryField
from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models import Avg
from core_apps.apartments.models import ApartmentBase #, Apartment
from core_apps.common.models import TimeStampedModel
from django.dispatch import receiver
from django.db.models.signals import pre_save
User = get_user_model()


def get_user_username(instance: "Profile") -> str:
    return instance.user.username


class Profile(TimeStampedModel):
    class Gender(models.TextChoices):
     
        MALE = (
            "male",
            _("Male"),
        )
        FEMALE = (
            "female",
            _("Female"),
        )
        OTHER = (
            "other",
            _("Other"),
        )

    class Occupation(models.TextChoices):
        Mason = (
            "mason",
            _("Mason"),
        )
        Carpenter = (
            "carpenter",
            _("Carpenter"),
        )
        Plumber = (
            "plumber",
            _("Plumber"),
        )
        Roofer = (
            "roofer",
            _("Roofer"),
        )
        Painter = (
            "painter",
            _("Painter"),
        )
        Electrician = (
            "electrician",
            _("Electrician"),
        )
        HVAC = (
            "hvac",
            _("HVAC"),
        )
        TENANT = (
            "tenant",
            _("Tenant"),
        )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    avatar = CloudinaryField(verbose_name=_("Avatar"), blank=True, null=True)
    gender = models.CharField(
        verbose_name=_("Gender"),
        max_length=10,
        choices=Gender.choices,
        default=Gender.OTHER,
    )
    bio = models.TextField(verbose_name=_("Bio"), blank=True, null=True)
    occupation = models.CharField(
        verbose_name=_("Occupation"),
        max_length=20,
        choices=Occupation.choices,
        default=Occupation.TENANT,
    )
    phone_number = PhoneNumberField(
        verbose_name=_("Phone Number"), max_length=30, default="+48507123456"
    )
    country_of_origin = CountryField(verbose_name=_("Country"), default="PL")
    city_of_origin = models.CharField(
        verbose_name=_("City"), max_length=180, default="Wroclaw"
    )
    report_count = models.IntegerField(verbose_name=_("Report Count"), default=0)
    reputation = models.IntegerField(verbose_name=_("Reputation"), default=100)
    slug = AutoSlugField(populate_from=get_user_username, unique=True)
    apartments_base_profile = models.ForeignKey(
        ApartmentBase,
        on_delete=models.CASCADE,
        # editable=False,
        null=True,
        blank=True,
        related_name="apartments_base_profile",
        verbose_name=_("Apartments Profile"),
    )   
    
    apartment_profile = models.CharField(verbose_name=_("Apartment Id"), max_length=10, blank=True, null=True, default="")
    

    def __str__(self) -> str:
        return f"{self.user.first_name}'s Profile"

    @property
    def is_banned(self) -> bool:
        return self.report_count >= 5

    def update_reputation(self):
        self.reputation = max(0, 100 - self.report_count * 20)
                     
                
    def save(self, *args, **kwargs):
        self.update_reputation()
        super().save(*args, **kwargs)

    def get_average_rating(self):
        average = self.user.received_ratings.aggregate(Avg("rating"))["rating__avg"]
        return average if average is not None else 0.0
    

@receiver(pre_save, sender=Profile)
def save_apartments_base(sender, instance, *args, **kwargs):
    try:
        if not instance.apartments_base_profile:
            apartmentsbase = ApartmentBase.objects.all()
            if apartmentsbase.count() > 0: 
                apartmentsbase = ApartmentBase.objects.all()[0]                
                instance.apartments_base_profile = apartmentsbase
    except Exception as e:
        print(f"124. apartmennts Exception as {e}")  
        
  