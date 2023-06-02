FROM golang:1.19

LABEL name="Kenichiro"
LABEL desc="This challenge addresses Server-Side Request Forgery"

WORKDIR /app

COPY ./app/go.mod ./app/go.sum ./
RUN go mod download

COPY ./app/*.go ./

RUN go build -o app .

EXPOSE 8080

# Run
CMD ["go", "run", "."]