from django.db import models
from django_countries.fields import CountryField
from core.models import BaseTimeStampedModel


# Create your models here.
class NetworkOperators(BaseTimeStampedModel):
    title = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    network = models.CharField(max_length=100)
    prefix = models.PositiveIntegerField()
    mcc = models.PositiveIntegerField(verbose_name= 'Mobile Country Codes (MCC)')
    mnc = models.PositiveIntegerField(verbose_name= 'Mobile Network Codes (MNC)')
    country = CountryField(default='BD')

    class Meta:
        ordering = ('-id',)

    def __str__(self) -> str:
        return self.title[:70]
    

class CommunicationProfile(BaseTimeStampedModel):
    title = models.CharField(max_length=100)
    iccid = models.CharField(max_length=50, verbose_name= 'Integrated Circuit Card ID (ICCID)')
    msisdn = models.CharField(max_length=20, unique= True, verbose_name= 'Mobile Station ISDN Number (MSISDN)')
    imsi = models.CharField(max_length=20, unique= True, verbose_name= 'International Mobile Subscriber Identity (IMSI)')
    operator = models.ForeignKey(NetworkOperators, on_delete= models.SET_NULL, null= True, blank= True,related_name= 'profile_mno')
    is_active = models.BooleanField(default= False)
    
    def __str__(self) -> str:
        return f'{self.operator} ⇔ {self.msisdn} | {self.imsi}'
    

class ConsumerKYC(BaseTimeStampedModel):
    name = models.CharField(max_length=100)
    father_name = models.CharField(max_length=100, verbose_name="Father's Name", null= True, blank= True)
    national_id = models.CharField(max_length=50, unique= True)
    dob = models.DateField(verbose_name='Date of birth')
    mno_profiles = models.ManyToManyField(CommunicationProfile, blank= True, related_name= 'consumer_profile')
    address = models.TextField(max_length=500, null= True, blank= True)
    nationality = CountryField(default='BD')
    
    def __str__(self) -> str:
        return f'{self.name} ⇔ {self.national_id} | {self.nationality}' 
    
    
class RoamingPack(BaseTimeStampedModel): 
    CURRENCY_CHOICES = [
        ('bdt','BDT'),
        ('usd','USD'),
        ('eur','EUR'),
    ] 
    pack_name = models.CharField(max_length=100) 
    offer_details = models.TextField(max_length=500) 
    tariff_excluding = models.FloatField(verbose_name= 'Tariff (Excluding VAT, SD, and SC)')
    tariff_inclusive = models.FloatField(verbose_name= 'Tariff (All Inclusive)')
    currency = models.CharField(max_length=20, choices= CURRENCY_CHOICES, default= 'usd')
    service_duration = models.FloatField(verbose_name= 'Duration in hours')
    ussd_code = models.CharField(max_length=10, verbose_name= 'USSD Code') 
    operator = models.ForeignKey(NetworkOperators, on_delete= models.CASCADE, related_name= 'roaming_mno')
    partner = models.ForeignKey(NetworkOperators, on_delete= models.SET_NULL, null= True, blank= True,related_name= 'roaming_pmno')
    
    def __str__(self) -> str:
        return f'{self.pack_name} | {self.operator} ⇔ {self.partner}' 