FROM python:3.8-slim-buster

LABEL name="Picklito"
LABEL desc="This is a pickle deserialization bug"

RUN apt-get update && apt-get install -y netcat-traditional
WORKDIR /app

ADD ./app /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
