namespace LookEach.User.ViewModel
{
    public class UserViewModel
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public DateTime Dob { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Thumbnail { get; set; }
        public bool IsActived { get; set; }
        public List<RoleViewModel> Roles { get; set; }
    }
}
