FROM python:3.8-slim-buster

LABEL name="Takashi"
LABEL desc="This challenge addresses Broken Access Control - Session Hijacking"

WORKDIR /app

ADD ./app /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]