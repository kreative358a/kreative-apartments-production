from django.urls import path

from .views import ApartmentCreateAPIView, ApartmentDetailAPIView, ApartmentSelectAPIView, ApartmentListAPIView

urlpatterns = [
    path("", ApartmentListAPIView.as_view(), name="apartment-list"),
    path("add/", ApartmentCreateAPIView.as_view(), name="add-apartment"),
    path("select/", ApartmentSelectAPIView.as_view(), name="select-apartment"),
    path("my-apartment/", ApartmentDetailAPIView.as_view(), name="apartment-detail"),
]