container=$(docker ps | grep -w parksamart | awk '{print $1}')
if [[ $container ]]
    then
        docker container stop $container
        docker container rm $container
fi

{ 
    docker image rm parksamart
} || {
    echo "Server does not contain parksamart image"
}

docker build -t parksamart:latest .
docker run -d -p 80:80 parksamart:latest