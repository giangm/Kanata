FROM python:3.8-slim-buster

LABEL name="Sakura"
LABEL desc="This challenge addresses Stored Cross-Site Scripting"

WORKDIR /app

ADD ./app /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]