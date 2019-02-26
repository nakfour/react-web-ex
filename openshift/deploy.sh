#!/bin/bash
#set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

oc process -f ${DIR}/nodejs-server.yml | oc create -f -
oc process -f ${DIR}/react-web-app.yml | oc create -f -
oc process -f ${DIR}/nginx-ex.yml | oc create -f -


