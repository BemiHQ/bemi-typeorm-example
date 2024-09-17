init:
	devbox install && \
	devbox run initdb && \
		sed -i "s/#port = 5432/port = 5434/g" ./.devbox/virtenv/postgresql/data/postgresql.conf && \
		sed -i "s/#log_statement = 'none'/log_statement = 'all'/g" ./.devbox/virtenv/postgresql/data/postgresql.conf && \
		sed -i "s/#logging_collector = off/logging_collector = on/g" ./.devbox/virtenv/postgresql/data/postgresql.conf && \
		sed -i "s/#log_directory = 'log'/log_directory = 'log'/g" ./.devbox/virtenv/postgresql/data/postgresql.conf

create:
	devbox run "createdb -p 5434 bemi_dev_source && \
		createuser -p 5434 --superuser --replication postgres && \
		psql -p 5434 -U postgres -c \"ALTER SYSTEM SET wal_level = logical;\"" && \
		make down-services up-services

delete:
	devbox run "dropdb -p 5434 bemi_dev_source && dropuser -p 5434 postgres"

reset:
	devbox run "dropdb -p 5434 bemi_dev_source && createdb -p 5434 bemi_dev_source" && \
		make migrate

install:
	devbox run "cd server && bun install && cd ../client && bun install"

up:
	devbox run "bun run concurrently \"make up-server\" \"make up-client\""

up-server:
	devbox run --env-file ./server/.env "cd server && bun --inspect src/index.ts"

up-client:
	devbox run "cd client && PORT=4002 bun run react-scripts start"

up-services:
	devbox services start postgresql-source

down-services:
	devbox services stop

psql:
	devbox run psql bemi_dev_source -p 5434

logs:
	tail -f .devbox/virtenv/postgresql/data/log/postgresql-*.log

ps:
	@devbox services ls

sh:
	devbox shell

migrate:
	devbox run "cd server && bun -b run typeorm migration:run -d ./src/data-source.ts"

rollback:
	devbox run "cd server && bun -b run typeorm migration:revert -d ./src/data-source.ts"

add-migration:
	devbox run "bun run typeorm migration:create migrations/$(NAME)"
