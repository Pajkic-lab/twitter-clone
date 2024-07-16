#!/bin/bash

docker-compose up -d postgres-dev

echo "Waiting for PostgreSQL container to spin up..."
until docker-compose exec postgres-dev pg_isready; do
    sleep 1
done

echo "PostgreSQL container is up and running."

exec "$@"
