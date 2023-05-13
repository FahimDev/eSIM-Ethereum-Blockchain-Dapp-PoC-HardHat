from django.contrib import admin
from network_operator.models import NetworkOperators, CommunicationProfile, ConsumerKYC


# Register your models here.
@admin.register(NetworkOperators)
class NetworkOperatorsAdmin(admin.ModelAdmin):
    list_display = ('prefix', 'title')
    

@admin.register(CommunicationProfile)
class CommunicationProfileAdmin(admin.ModelAdmin):
    list_display = ('iccid', 'operator')
    
    
@admin.register(ConsumerKYC)
class ConsumerKYCAdmin(admin.ModelAdmin):
    list_display = ('name', 'national_id')