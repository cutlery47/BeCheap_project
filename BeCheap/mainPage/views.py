from .models import Items
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ItemsSerializer


class GetItemsView(APIView):
    def get(self, request):
        query_set = Items.objects.all()
        serialized_model = ItemsSerializer(query_set, many=True)
        return Response(serialized_model.data)
