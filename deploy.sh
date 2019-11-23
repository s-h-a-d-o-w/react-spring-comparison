#!/bin/bash
set -e

export CAPROVER_APP=react-spring-comparison
export CAPROVER_TAR_FILE=./caprover_deployment.tar

yarn build
tar -cvf ./caprover_deployment.tar ./Dockerfile ./build/*

export CAPROVER_URL=$CAPROVER_MACHINE_01
caprover deploy

export CAPROVER_URL=$CAPROVER_MACHINE_02
caprover deploy

rm caprover_deployment.tar
