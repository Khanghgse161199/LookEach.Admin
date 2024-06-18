using LookEach.User.Model;

namespace LookEach.User.ViewModel
{
    public class CartDetailViewModel
    {
        public string UserId { get; set; }
        public string ProductId { get; set; }
        public string Material { get; set; }
        public string SizeId { get; set; }
        public int Amount { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public bool IsActive { get; set; }
        public string SizeName { get; set; }
        public double Price { get; set; }
        public string ProductName { get; set; }
        public string ShopId { get; set; }
        public string ShopName { get; set; }
        public string Note { get; set; }
        public string VoucherShopId { get; set; }
        public float LevelOff { get; set; }
        public List<FileUpload> Files { get; set; } = new List<FileUpload>();
        public List<Model.Color> ColorChoices { get; set; } = new List<Model.Color>();
    }
}
