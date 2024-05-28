import requests
from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view
from datetime import datetime
from serpapi import GoogleSearch

@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('city', openapi.IN_PATH, description="City to fetch hotels for", type=openapi.TYPE_STRING),
        openapi.Parameter('startDate', openapi.IN_PATH, description="Start date (YYYY-MM-DD)", type=openapi.TYPE_STRING),
        openapi.Parameter('endDate', openapi.IN_PATH, description="End date (YYYY-MM-DD)", type=openapi.TYPE_STRING)
    ],
    responses={
        200: openapi.Response(
            description="Successful response",
            examples={
                "application/json": {
                    "hotels": [
                        {
                            "name": "Hotel Name",
                            "address": "Hotel Address",
                            "price": "Price per night"
                        }
                    ]
                }
            }
        ),
        400: openapi.Response(description="Invalid date format or missing parameters"),
        500: openapi.Response(description="Internal server error")
    }
)
@api_view(['GET'])
def get_hotels(request, city, startDate, endDate):

    # Validate request parameters
    try:
        # Assuming format YYYY-MM-DD (adjust if needed)
        startDate = datetime.strptime(startDate, '%Y-%m-%d')
        endDate = datetime.strptime(endDate, '%Y-%m-%d')
    except ValueError:
        return JsonResponse({'error': 'Invalid date format. Please use YYYY-MM-DD.'}, status=400)

    # Construct search parameters based on request parameters
    params = {
        "engine": "google_hotels",
        "q": f"{city} hotels",
        "check_in_date": startDate,
        "check_out_date": endDate,
        "adults": "2",
        "currency": "USD",
        "gl": "us",
        "hl": "en",
        "api_key": "1cab4e7d0d946f7098aae7c4641ee68330f30a879dd7d2eb6324e8ae92d4d320",  # Replace with your actual API key
    }

    try:
        search = GoogleSearch(params)
        results = search.get_dict()

        return JsonResponse(results)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching hotel data: {e}")
        return JsonResponse({'error': 'Internal server error. Please try again later.'}, status=500)

