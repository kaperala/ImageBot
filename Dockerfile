FROM node:16.17

ENV USER=imagebot

RUN groupadd -r ${USER} && \
    useradd --create-home --home /home/imagebot -r -g ${USER} ${USER}

USER ${USER}
WORKDIR /home/imagebot

COPY --chown=${USER}:${USER} package*.json ./
RUN npm install
VOLUME [ "/home/imagebot" ]

COPY --chown=${USER}:${USER}  . .

ENTRYPOINT [ "npm", "run", "start" ]