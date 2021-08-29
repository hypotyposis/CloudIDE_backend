# echo "executed"
filename=$1
# echo $filename
# read filename
if g++ ./compile/$filename.cpp -o ./compile/$filename.exe
then
    ./compile/$filename.exe < ./compile/$filename.in
    rm ./compile/$filename.exe
    rm ./compile/$filename.in
fi
