namespace LookEach.User.Model
{
    public class Size
    {
        public string Id { get; set; }
        public int TypeId { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public bool Check { get; set; } = false;
    }
}
