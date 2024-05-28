FROM python:3.9 as HotelSuggestService-build

WORKDIR ./

RUN pip install django
RUN pip install requests
RUN pip install drf-yasg
RUN pip install serpapi
RUN pip install google-search-results
RUN pip install django-cors-headers

COPY ./ ./

CMD ["python", "manage.py", "runserver", "130.204.81.247:8000"]