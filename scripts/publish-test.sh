SHELL_PATH="$(cd $(dirname $0); pwd)";
PROJECT_PATH="$(cd $SHELL_PATH ; cd ../ ; pwd)";

cd $PROJECT_PATH;

IMAGE_TAG="example-service-test";
REMOTE_NAME="18058173171/example-service-test:latest";

docker rmi $REMOTE_NAME --force;
docker tag $IMAGE_TAG $REMOTE_NAME;
docker push $REMOTE_NAME;
docker rmi $IMAGE_TAG --force;