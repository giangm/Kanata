FROM golang:1.19

LABEL name="Quiona"
LABEL desc="This challenge addresses Blind SQL injection"

RUN apt update -y && apt upgrade -y

WORKDIR /app

COPY ./app/go.mod ./app/go.sum ./
RUN go mod download

COPY ./app .

ENV CGO_CFLAGS="-g -O2 -Wno-return-local-addr"

EXPOSE 10000

RUN ls

# Run
CMD ["go", "run", "main.go"]
