FROM golang:1.19

LABEL name="Hirotaka"
LABEL desc="This challenge addresses Business Logic Failure and Command Injection"

WORKDIR /app

COPY ./app/go.mod ./app/go.sum ./
RUN go mod download

COPY ./app/*.go ./

EXPOSE 8080

# Run
CMD ["go", "run", "."]
