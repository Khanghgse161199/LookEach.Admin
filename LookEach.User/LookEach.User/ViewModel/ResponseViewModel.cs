namespace LookEach.User.ViewModel
{
    public class ResponseViewModel
    {
        public string Value { get; set; }
        public bool IsSuccess { get; set; }
        public bool IsFailure { get; set; }
        public ErrorViewModel Error { get; set; }
    }
}
