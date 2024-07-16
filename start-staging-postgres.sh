#!/bin/bash

docker-compose up -d postgres-staging

echo "Waiting for PostgreSQL container to spin up..."
until docker-compose exec postgres-staging pg_isready; do
    sleep 1
done

echo "PostgreSQL container is up and running."

exec "$@"
