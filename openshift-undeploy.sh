#!/bin/bash
set -x


oc process -f ./openshift/nginx.yml | oc delete -f -
oc process -f ./openshift/build.yml | oc delete -f -


