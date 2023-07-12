FROM python:3.8-slim-buster

LABEL name="Gomenasai"
LABEL desc="This is a directory traversal bug bug"

WORKDIR /app

ADD ./app /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
