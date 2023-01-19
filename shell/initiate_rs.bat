cd %1
set title=Config initiate replicaset on primary port : %2
start cmd /c "title %title% & mongo --port %2"