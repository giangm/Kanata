FROM python:3.8-slim-buster

LABEL name="upliter"
LABEL desc="File upload challenge, they are supposed to upload images but can upload a php file that will execute and return results."

WORKDIR /app

ADD ./app /app

RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install php -y

EXPOSE 5000

CMD ["python", "app.py"]
