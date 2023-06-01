FROM golang:1.19

LABEL name="Akio"
LABEL desc="This challenge addresses IDOR and Command Injection"

RUN apt update -y && apt upgrade -y
RUN apt install -y iputils-ping

WORKDIR /app

COPY ./app/go.mod ./app/go.sum ./
RUN go mod download

COPY ./app/*.go ./

ENV CGO_CFLAGS="-g -O2 -Wno-return-local-addr"

EXPOSE 8080

# Run
CMD ["go", "run", "."]
