#!/bin/bash
set -x

oc process -f ./openshift/nodejs-server.yml | oc delete -f -
oc process -f ./openshift/react-web-app.yml | oc delete -f -
oc process -f ./openshift/nginx-ex.yml | oc delete -f -



