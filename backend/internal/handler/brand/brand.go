package brandHandler

import (
  database 
	"github.com/gofiber/fiber/v2"
)

func GetItemsBySlug(c *fiber.Ctx) error {
	//
	return c.JSON("this is brand url")
}

func GetAllItems(c *fiber.Ctx) error {
	type Item struct {
		ID            int     `json:"id"`
		Title         string  `json:"title"`
		Price         float32 `json:"price"`
		Discount      float32 `json:"discount"`
		Discount_type string  `json:"discount_type"`
		Description   string  `json:"description"`
		Material      string  `json:"material"`
		Is_preorder   int     `json:"is_preorder"`
		Hidden        int     `json:"hidden"`
		Url           string  `json:"url"`
	}
	db := database.DB

	var items []Item
	db.Joins("JOIN brands ON items.brand_id=brands.id").
		Joins("JOIN images ON items.id=images.item_id").
		Where("items.hidden = ?", 0).
		Where("items.is_preorder= ?", 0).
		Select("items.id, items.title, items.price, items.discount, items.discount_type, images.url").
		Group("items.id").
		Order("items.created_at DESC").
		Find(&items)
	return c.JSON(fiber.Map{"hasError": false, "metadata": nil, "errorMessage": "", "payload": items})
	// return nil
}
