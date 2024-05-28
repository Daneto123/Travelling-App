from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view
import requests

@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter(
            'city',
            openapi.IN_PATH,
            description="City to fetch monuments for",
            type=openapi.TYPE_STRING
        )
    ],
    responses={
        200: openapi.Response(
            description="Successful response",
            examples={
                "application/json": {
                    "items": [
                        {
                            "title": "Monument Title",
                            "description": "Description of the monument",
                            "location": "City, Country"
                        }
                    ]
                }
            }
        ),
        400: openapi.Response(description="Missing city parameter"),
        500: openapi.Response(description="Internal Server Error")
    }
)
@api_view(['GET'])
def get_monuments(request, city):
    api_key = 'kingerte'
    print(city)

    if city:
        endpoint_url = f'https://api.europeana.eu/record/v2/search.json?wskey={api_key}&query=where:({city})'
        try:
            response = requests.get(endpoint_url)
            
            if response.status_code == 200:
                data = response.json()
                return JsonResponse(data)
            else:
                return JsonResponse({'error': 'Failed to fetch monuments'}, status=response.status_code)
        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': 'nishto ne stava'}, status=500)
    
    else:

        return JsonResponse({'error': 'Missing city parameter'}, status=400)
