# Makefile for SvelteKit and Go project

# Directories
FRONTEND_DIR := frontend
BACKEND_DIR := .
DIST_DIR := $(FRONTEND_DIR)/build
BIN_DIR := $(BACKEND_DIR)/bin
APP_NAME := mini-blog

# Commands
NPM := npm
GO := go
RM := rm -rf
CP := cp -r

.PHONY: all clean build build-frontend build-backend dev start

all: build run

clean:
	$(RM) $(DIST_DIR)
	$(RM) $(BIN_DIR)

build-frontend:
	cd $(FRONTEND_DIR) && $(NPM) install && $(NPM) run build

build-backend:
	mkdir -p $(BIN_DIR)
	go build -o $(BIN_DIR)/$(APP_NAME) $(BACKEND_DIR)/main.go

build: build-frontend build-backend

dev:
	@if [ ! -d $(DIST_DIR) ]; then $(MAKE) build-frontend; fi
	
	cd $(FRONTEND_DIR) && $(NPM) install && $(NPM) run dev & cd $(BACKEND_DIR) && $(GO) run main.go serve

start: build
	cd $(BIN_DIR) && ./$(APP_NAME)