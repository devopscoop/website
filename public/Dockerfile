FROM google/dart as dart

ARG DART_SASS_VERSION=1.70.0
ARG DART_SASS_TAR=dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz
ARG DART_SASS_URL=https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/${DART_SASS_TAR}

ADD ${DART_SASS_URL} /opt/
RUN cd /opt/ && tar -xzf ${DART_SASS_TAR} && rm ${DART_SASS_TAR}
WORKDIR /opt/dart-sass

COPY ./sass /sass
COPY ./assets/css /css

RUN /opt/dart-sass/sass --no-source-map --style=compressed /sass:/css
