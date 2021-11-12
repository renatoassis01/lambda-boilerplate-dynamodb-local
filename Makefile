up-dynamo-db:
	docker-compose -f  docker-compose.yaml up -d

list-dynamo-tables:
	aws dynamodb list-tables --endpoint-url http://localhost:8000

desc-dynamo-table:
	aws dynamodb describe-table --table-name ${table} --endpoint-url http://localhost:8000 | jq

down:
	docker-compose -f docker-compose.yaml down
logs:
	docker-compose -f docker-compose.yaml logs




