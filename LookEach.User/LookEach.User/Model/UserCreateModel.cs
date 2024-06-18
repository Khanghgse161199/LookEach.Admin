using System.ComponentModel.DataAnnotations;

namespace LookEach.User.Model
{
    public class UserCreateModel
    {
        public string Username { get; set; } = "!@#not-info";
        public string Password { get; set; } 
        public string Name { get; set; } 
        public DateTime Dob { get; set; } = DateTime.Now;
        public string? Address { get; set; } = "!@#not-info";
        public string Gender { get; set; } = "!@#not-info";
        public string Email { get; set; } 
        public string? Phone { get; set; } 
    }
}
