from django.contrib import admin
from network_operator.models import NetworkOperators, CommunicationProfile, ConsumerKYC, RoamingPack


# Register your models here.
@admin.register(NetworkOperators)
class NetworkOperatorsAdmin(admin.ModelAdmin):
    list_display = ('prefix', 'title', 'mnc', 'mcc', 'country')
    

@admin.register(CommunicationProfile)
class CommunicationProfileAdmin(admin.ModelAdmin):
    list_display = ('iccid', 'msisdn', 'operator')
    
    
@admin.register(ConsumerKYC)
class ConsumerKYCAdmin(admin.ModelAdmin):
    list_display = ('name', 'shareable_uuid', 'national_id', 'operator_list', 'nationality')
    
    def operator_list(self, obj):
        return ", ".join([profile.msisdn for profile in obj.mno_profiles.all()])
    
    
@admin.register(RoamingPack)
class RoamingPackAdmin(admin.ModelAdmin):
    list_display = ('pack_name', 'offer_details', 'operator', 'partner')