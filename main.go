package main

import (
	"embed"
	"log"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

//go:embed all:frontend/build
var frontend embed.FS

var distDirFS = echo.MustSubFS(frontend, "frontend/build")

func main() {
	app := pocketbase.New()

	// Integrate Echo router with PocketBase
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.Any("/*", echo.StaticDirectoryHandler(distDirFS, false))

		return nil
	})

	// Start the PocketBase application
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
