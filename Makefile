PROJECT = cwxstat-23
NAME = bot
TAG = dev


docker-build:
	docker build --no-cache -t gcr.io/$(PROJECT)/$(NAME):$(TAG) -f Dockerfile .



