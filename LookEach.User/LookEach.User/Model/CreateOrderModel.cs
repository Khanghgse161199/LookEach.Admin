using LookEach.User.ViewModel;

namespace LookEach.User.Model
{
    public class CreateOrderModel
    {
        public string ShopId { get; set; } = string.Empty;
        public string ShopName { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public string VoucherId { get; set; } = string.Empty;
        public float LevelOff { get; set; } = 0;
        public decimal Amount { get; set; } = 0;
        public decimal Total { get; set; } = 0;
        public IGrouping<string, CartDetailViewModel> _cartGroupings { get; set; }
    }
}
