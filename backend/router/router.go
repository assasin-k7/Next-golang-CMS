package router

import (
	pageRoutes "backend/internal/routes/page"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())

	api.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("hi world\n")
	})

	pageRoutes.SetupRoutes(api)
}
