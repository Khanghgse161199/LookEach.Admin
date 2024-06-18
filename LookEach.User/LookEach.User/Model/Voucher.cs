namespace LookEach.User.Model
{
    public class Voucher
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime StartTime { get; set; } = DateTime.Now;
        public DateTime EndTime { get; set; } = DateTime.Now;
        public bool IsActived { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public decimal PriceCondition { get; set; }
        public int SlotAvailable { get; set; }
        public int CurrentSlot { get; set; }
        public float LevelOff { get; set; }
        public bool IsSystem { get; set; }
    }
}
