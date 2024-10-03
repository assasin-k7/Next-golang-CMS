package PageHandler

import (
	"backend/database"
	"backend/internal/model"

	"github.com/gofiber/fiber/v2"
)

func GetMenuNavLinks(c *fiber.Ctx) error {
	db := database.DB
	var links []model.Page
	db.Order("`order` ASC").Select("id, slug, text, is_permanent, `order`").Find(&links)
	return c.JSON(fiber.Map{"hasError": false, "metadata": nil, "errorMessage": "", "payload": links})
}
