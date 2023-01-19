cd %1
set title=Instance running on port : %4
start cmd /c "title %title% && mongod --replSet %2 --dbpath %3 --port %4"