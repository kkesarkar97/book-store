echo "Replacing env variables for react app"
for NAME_VALUE in `env | grep "REACT_APP"`
do

    NAME=`echo $NAME_VALUE | cut -d"=" -f1`
    VALUE=`echo $NAME_VALUE | cut -d"=" -f2`
    echo "Replacing $NAME with $VALUE"
    sed -i s,$NAME,$VALUE,g /usr/share/nginx/html/static/js/*
done
