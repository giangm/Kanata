FROM golang:1.19

LABEL name="Xoyfina"
LABEL desc="This challenge addresses second order SQL injection"

RUN apt update -y && apt upgrade -y

WORKDIR /app

COPY ./app/go.mod ./app/go.sum ./
RUN go mod download

COPY ./app/*.go ./

ENV CGO_CFLAGS="-g -O2 -Wno-return-local-addr"

EXPOSE 5000

# Run
CMD ["go", "run", "."]
