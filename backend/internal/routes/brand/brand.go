package brandRoutes

import (
	brandHandler "backend/internal/handler/brand"

	"github.com/gofiber/fiber/v2"
)

func SetupBrandRoutes(router fiber.Router) {

	brand := router.Group("/brand")
	brand.Get("/all", brandHandler.GetAllItems)
}
