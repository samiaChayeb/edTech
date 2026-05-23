#!/usr/bin/env bash

# Build script for Render deployment
echo "Installing dependencies..."
npm install

echo "Building backend..."
npm run build --workspace=apps/backend

echo "Generating Prisma client..."
npm run db:generate --workspace=apps/backend

echo "Running migrations..."
npm run db:migrate --workspace=apps/backend

echo "✅ Build complete!"
