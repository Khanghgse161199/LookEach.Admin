using LookEach.User.Model;
using System.Drawing;

namespace LookEach.User.ViewModel
{
    public class ProductDetailViewMode
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string BrandId { get; set; }
        public string CategoryId { get; set; }
        public int ObjectTypeId { get; set; }
        public string Material { get; set; } = string.Empty;
        public int Height { get; set; } = 0;
        public int Circumference { get; set; } = 0;
        public int Waist { get; set; } = 0;
        public int Hips { get; set; } = 0;
        public string Origin { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public List<Model.Color> ColorChoices { get; set; } = new List<Model.Color>();
        public List<Model.Size> SizeChoices { get; set; } = new List<Model.Size>();
        public List<FileUpload> Files { get; set; } = new List<FileUpload>();
    }
}
