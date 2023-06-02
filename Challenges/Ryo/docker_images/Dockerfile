FROM golang:1.19

LABEL name="Ryo"
LABEL desc="This challenge addresses Time-of-Check to Time-of-Use (TOCTOU)"

RUN apt update -y && apt upgrade -y

WORKDIR /app

COPY ./app/go.mod ./app/go.sum ./
RUN go mod download

COPY ./app/*.go ./

EXPOSE 8080

# Run
CMD ["go", "run", "."]
