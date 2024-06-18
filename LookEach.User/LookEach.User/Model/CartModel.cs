using Microsoft.AspNetCore.Http.HttpResults;

namespace LookEach.User.Model
{
    public class CartModel
    {
        public string UserId { get; set; }
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string SizeId { get; set; }
        public string SizeName { get; set; }    
        public int Amount { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<FileUpload> Files { get; set; } = new List<FileUpload>();
    }
}
