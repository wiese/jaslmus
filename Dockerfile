FROM docker.io/node:15.8.0

RUN apt-get update && \
	apt-get install -y \
		ca-certificates

ARG UID=1000
ARG GID=1000

RUN npm install -g npm@7.5.2 @vue/cli@4.5.11

RUN mkdir /app && chown $UID:$GID /app

USER $UID
