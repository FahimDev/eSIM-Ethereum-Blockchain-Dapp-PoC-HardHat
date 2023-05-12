from django.db import models
from datetime import datetime
from django_countries.fields import CountryField
from django.core.validators import MinValueValidator, MaxValueValidator
from core.models import BaseTimeStampedModel


# Create your models here.
class LogisticDetail(BaseTimeStampedModel):
    title = models.CharField(max_length=100)
    tin_number = models.PositiveIntegerField()
    address = models.TextField(max_length=500)
    country = CountryField()

    class Meta:
        ordering = ('-id',)

    def __str__(self) -> str:
        return self.title[:70]
    

class TransportDetail(BaseTimeStampedModel):
    VEHICLE_TYPE_CHOICES = [
        ('sedan','Sedan'),
        ('minivan','Minivan-MPV'),
        ('hatchback','Hatchback-MPV'),
        ('pickup','Pickup'),
        ('freezer_van','Freezer Van'),
        ('covered_van','Covered Van'),
        ('truck','Truck'),
    ]
    CAPACITY_UNIT_CHOICES = [
        ('kg','KG'),
        ('ton','TON'),
    ]
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    chassis_type = models.CharField(
        max_length=20, choices=VEHICLE_TYPE_CHOICES, default='minivan')
    authority_zone = models.CharField(max_length=200, null= True, blank= True)
    registration_number = models.CharField(max_length=200, null= True, blank= True)
    capacity = models.PositiveIntegerField()
    capacity_unit = models.CharField(max_length=10, choices= CAPACITY_UNIT_CHOICES, default= 'ton')
    owners_id = models.ManyToManyField(LogisticDetail, null= True, blank= True, related_name= 'transport_owners')
    
    def __str__(self) -> str:
        return f'{self.authority_zone}-{self.registration_number} ⇔ {self.capacity} {self.capacity_unit} | {self.chassis_type}'

    
class DriverDetail(BaseTimeStampedModel):
    BLOOD_GROUP_CHOICES = [
        ('a_pos','A+'),
        ('a_neg','A-'),
        ('b_pos','B+'),
        ('b_neg','B-'),
        ('ab_pos','AB+'),
        ('ab_neg','AB-'),
        ('o_pos','O+'),
        ('o_neg','O-'),
    ]
    name = models.CharField(max_length=100)
    license_no = models.CharField(max_length=200, unique= True)
    national_id = models.CharField(max_length=200, unique= True)
    dob = models.DateField()
    blood_group = models.CharField(
        max_length=10, choices=BLOOD_GROUP_CHOICES)
    issuer_authority = models.CharField(max_length=200)
    issue_year = models.PositiveIntegerField(validators=[
        MinValueValidator(1900),
        MaxValueValidator(datetime.now().year)],
        help_text="Use the following format: <YYYY>")
    validity_date = models.DateField()
    employer_id = models.ForeignKey(LogisticDetail, on_delete= models.SET_NULL, null= True, blank= True, related_name= 'driver_employer')
    
    def __str__(self) -> str:
        return f'{self.name} ⇔ {self.license_no} | {self.validity_date}'
    