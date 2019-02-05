#!/bin/bash
set -x


oc process -f ./openshift/build.yml | oc create -f -
oc process -f ./openshift/nginx.yml | oc create -f -


