namespace LookEach.User.ViewModel
{
    public class ResponseBase<T> where T : class
    {
        public T Value { get; set; }
        public bool IsSuccess { get; set; }
        public bool IsFailure { get; set; }
        public ErrorViewModel Error { get; set; }
    }
}
