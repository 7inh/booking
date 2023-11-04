#!/bin/bash

# Define the repository name
repository_name="kamibrain-web-ui"
organization_name="aimasterio"
gcp_project_id="kamiverse-service"

# Read the image version from user input
read -p "Enter the image version: " image_version

# Build the Docker image
docker build -t $repository_name:$image_version .

# Tag the image with the repository name
docker tag $repository_name:$image_version $organization_name/$repository_name:$image_version

# Push the image to Docker Hub
docker push $organization_name/$repository_name:$image_version

gcloud auth login

gcloud auth configure-docker
docker tag $repository_name:$image_version gcr.io/$gcp_project_id/$repository_name:$image_version
docker push gcr.io/$gcp_project_id/$repository_name:$image_version

# Clean up: Remove the local image
docker rmi $repository_name:$image_version

