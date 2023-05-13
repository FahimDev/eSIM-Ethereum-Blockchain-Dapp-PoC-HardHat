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
    
    def __str__(self) -> str:
        return f'{self.operator} ⇔ {self.msisdn} | {self.imsi}'
    

class ConsumerKYC(BaseTimeStampedModel):
    name = models.CharField(max_length=100)
    national_id = models.CharField(max_length=50, unique= True)
    mno_profiles = models.ManyToManyField(CommunicationProfile, blank= True, related_name= 'consumer_profile')