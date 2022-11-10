FROM node:16.17

ENV USER=imagebot

RUN apt-get update && \
    apt-get install -y python3 build-essential && \
    apt-get purge -y --auto-remove

RUN groupadd -r ${USER} && \
    useradd --create-home --home /home/imagebot -r -g ${USER} ${USER}

USER ${USER}
WORKDIR /home/imagebot

COPY --chown=${USER}:${USER} package*.json ./
RUN npm install --omit=dev
VOLUME [ "/home/imagebot" ]

COPY --chown=${USER}:${USER}  . .

ENTRYPOINT [ "npm", "run", "prod" ]