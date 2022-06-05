SHELL=cmd.exe


run_build:	
	@echo Stopping docker images (if running...)
	docker-compose -p notes down --remove-orphans
	@echo Building (when required) and starting docker images...
	docker-compose -p notes up --build -d
	@echo Docker images built and started!

down:
	@echo Stopping docker images (if running...)
	docker-compose -p notes down --remove-orphans