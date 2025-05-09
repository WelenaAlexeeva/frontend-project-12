build:
	rm -rf frontend/dist
	cd frontend && npm run build

start:
	cd frontend && npx start-server -s ./dist

install:
	npm ci && cd frontend && npm ci