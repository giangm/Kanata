FROM python:3.8-slim-buster

LABEL name="Emi"
LABEL desc="This challenge address Server-Side Template Injection"

WORKDIR /app

ADD ./app /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]