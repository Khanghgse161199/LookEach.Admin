namespace LookEach.User.DTO
{
    public class ShopDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime Dob { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime CreatedOn { get; set; }
        public int FileId { get; set; }
        public int Number { get; set; }
        public bool IsFollow { get; set; }
        public int NumberFollow { get; set; }
    }
}

