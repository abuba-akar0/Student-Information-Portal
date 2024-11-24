from drf_yasg.openapi import Response
from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet
from questionnaire.models import CareerQuestion, CareerRecommendation, UserResponse
from questionnaire.serializers import CareerQuestionSerializer
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)


# API to fetch questions
class CareerQuestionAPI(APIView):
    def get(self, request):
        questions = CareerQuestion.objects.all()
        data = [{"id": q.id, "text": q.question_text, "choices": q.choices} for q in questions]
        return Response(data)


# API to submit responses and get recommendations
class CareerQuestionViewSet(ModelViewSet):
    queryset = CareerQuestion.objects.all()
    serializer_class = CareerQuestionSerializer


# views.py


class CareerRecommendationAPI(APIView):
    def post(self, request):
        try:
            user_id = request.data.get('user_id')
            responses = request.data.get('responses')  # User's responses as a dictionary

            if not user_id or not responses:
                return Response(
                    {"error": "Missing user_id or responses."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Fetch all career recommendations
            recommendations = CareerRecommendation.objects.all()

            matching_recommendations = []

            # Loop through each career recommendation to check if it matches the user's responses
            for rec in recommendations:
                match = True
                # Compare each response with the career's criteria
                for question_id, expected_answer in rec.criteria.items():
                    if str(question_id) not in responses or responses[str(question_id)] != expected_answer:
                        match = False
                        break

                if match:
                    matching_recommendations.append({
                        "name": rec.career_name,
                        "description": rec.description
                    })

            if not matching_recommendations:
                return Response(
                    {"recommendations": []},
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"recommendations": matching_recommendations},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print("Error in CareerRecommendationAPI:", e)
            return Response(
                {"error": "Internal server error. Please try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )