package pageRoutes

import (
	PageHandler "backend/internal/handler/page"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(router fiber.Router) {
	page := router.Group("/page")
	page.Get("/", PageHandler.GetMenuNavLinks)
}
