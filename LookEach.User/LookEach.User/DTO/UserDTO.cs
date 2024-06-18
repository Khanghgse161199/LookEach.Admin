namespace LookEach.User.DTO
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public DateTime Dob { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool EmailConfirm { get; set; }
        public string Password { get; set; }
        public bool IsActived { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string AccountOwner { get; set; }
    }
}
