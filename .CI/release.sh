#!/bin/bash

project_name=$1
service=$2
repo=$3
tag=$4

IMAGE="${repo}":"${tag}"

if docker pull "${IMAGE}"; then
	echo "Image ${IMAGE} is pulled"
else
	echo "WARNING!!! ${tag} does not exist or bad network connection!"
	exit 1
fi

old_container_id=`docker ps -q -f name="${project_name}"`
number_containers=`docker ps -q -f name="${project_name}" | wc -l`
export IMAGE="${IMAGE}"

if [ -z "${old_container_id}" ]; then
        docker-compose -f docker-compose.yaml -p "${project_name}" up -d "${service}"
        exit 0
fi

if [ "${number_containers}" -gt "1" ]; then
	echo "WARNING!!! More than 1 instance is working!!!"
        if docker-compose -f docker-compose.yaml -p "${project_name}" up -d  --no-recreate --scale "${service}"=1 "${service}" ; then
                old_container_id=`docker ps -q -f name="${project_name}"`
        else
                echo "WARNING !!! The service cannot be deployed!"
                exit 1
        fi
fi


docker stop "${old_container_id}"
docker rm "${old_container_id}"
docker-compose -f docker-compose.yaml -p "${project_name}" up -d "${service}"
yes | docker image prune

#if docker-compose -f docker-compose.yaml -p "${project_name}" up -d --no-recreate --scale "${service}"=2 "${service}" ; then
#    docker stop "${old_container_id}"
#    docker rm "${old_container_id}"
#    yes | docker image prune
#else
#  exit 1
#fi