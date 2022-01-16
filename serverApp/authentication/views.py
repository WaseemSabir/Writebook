from rest_framework.generics import GenericAPIView
from .serializers import ProfileSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.contrib.auth.models import User
# Create your views here.

class RegisterView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(GenericAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user:
            serializer = ProfileSerializer(user)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'detail': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)


class SearchUserView(GenericAPIView):
    serializer_class = ProfileSerializer

    def get(self, request, search):
        lookup = Q(username__icontains=search) | Q(first_name__icontains=search) | Q(last_name__icontains=search)

        users = User.objects.filter(lookup)
        serialized = ProfileSerializer(users, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)