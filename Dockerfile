FROM node AS build
RUN mkdir /workspace
WORKDIR /workspace
COPY . /workspace

RUN npm install
RUN npm test
RUN npm run build



FROM node:current-alpine
COPY --from=build /workspace /workspace

WORKDIR /workspace
RUN npm rebuild grpc
ENTRYPOINT ["npm"]
CMD ["start"]
