#!/usr/bin/env bash
set -e

echo "Starting PolicyDaily infrastructure (PostgreSQL & Services)..."
docker compose up -d

echo "Infrastructure running!"
echo "To start Mobile dev server: pnpm --filter mobile start"
echo "To view API logs: docker compose logs -f api"

