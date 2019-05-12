MAKEFLAGS += -j2

all: start_client start_server

install: install_client install_server

start_client:
	cd client && yarn start

start_server:
	cd server && go run .

start_server_dev:
	cd server && GST_DEBUG=*:3 go run . -video-src "videotestsrc"

install_client:
	cd client && yarn install

install_server:
	cd server && go install .