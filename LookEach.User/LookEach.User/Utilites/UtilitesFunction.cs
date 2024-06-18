using LookEach.User.Data;
using LookEach.User.Model;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.JSInterop;
using System.Text.RegularExpressions;

namespace LookEach.User.Utilites
{
    public static class UtilitesFunction
    {
        private static string PhonePattern = @"^\d+$";

        public static async Task<ValidateModel> ValidateAsync(object model, string passConfirm)
        {
            if (model != null && model is UserCreateModel)
            {
                var user = model as UserCreateModel;
                var result = new ValidateModel();

                result = await ValidateInput("Vui lòng điền tên đăng nhập", () => string.IsNullOrEmpty(user.Username));
                if (!result.Validate) return result;

                result = await ValidateInput("Vui lòng điền email phù hợp", () => string.IsNullOrEmpty(user.Email) || !user.Email.Contains("@"));
                if (!result.Validate) return result;

                result = await ValidateInput("Vui lòng điền số điện thoại phù hợp", () => string.IsNullOrEmpty(user.Phone) || !Regex.IsMatch(user.Phone, PhonePattern));
                if (!result.Validate) return result;

                result = await ValidateInput("Vui lòng điền mật khẩu ít nhất có 8 kí tự", () => string.IsNullOrEmpty(user.Password) || user.Password.Length < 8);
                if (!result.Validate) return result;

                result = await ValidateInput("Mật khẩu không trùng nhau vui lòng kiểm tra lại", () => user.Password.Trim() != passConfirm.Trim());
                if (!result.Validate) return result;

                return new ValidateModel
                {
                    Validate = true,
                    Message = string.Empty,
                };

            }
            else return new ValidateModel
            {
                Validate = false,
                Message = "Vui lòng điền đầy đủ thông tin đăng ký",
            };
        }
        private static async Task<ValidateModel> ValidateInput(string errorMessage, Func<bool> condition)
        {
            if (condition())
                return new ValidateModel
                {
                    Validate = false,
                    Message = errorMessage,
                };
            return new ValidateModel
            {
                Validate = true,
                Message = string.Empty,
            };
        }

        public static async Task<IFormFile> FileSelected(IJSRuntime jSRuntime, IBrowserFile file)
        {
            try
            {
                //var file = e.GetMultipleFiles(1).FirstOrDefault();
                long fileSizeInBytes = file.Size;
                long fileSizeInKB = fileSizeInBytes / 1024;
                long fileSizeInMB = fileSizeInKB / 1024;
                if (fileSizeInMB > 100)
                {
                    await jSRuntime.InvokeVoidAsync("AnnountMessage", 2, "Vui lòng tải File dưới 100MB");
                    return null;
                }

                await using var stream = file.OpenReadStream(fileSizeInBytes);
                IFormFile result = await ToMemoryStreamAsync(stream, file.Name, file.ContentType, jSRuntime);
                return result;
            }
            catch (Exception ex)
            {
                await jSRuntime.InvokeVoidAsync("AnnountMessage", 2, ex.Message.ToString());
                return null;
            }
        }

        private static async Task<IFormFile> ToMemoryStreamAsync(Stream stream, string fileName, string contentType, IJSRuntime jSRuntime)
        {
            try
            {
                var memoryStream = new MemoryStream();
                await stream.CopyToAsync(memoryStream);
                memoryStream.Position = 0;
                IFormFile formFile = new FormFile(memoryStream, 0, memoryStream.Length, fileName, fileName)
                {
                    Headers = new HeaderDictionary(),
                    ContentType = contentType
                };
                return formFile;
            }
            catch (Exception ex)

            {
                await jSRuntime.InvokeVoidAsync("AnnountMessage", 2, ex.Message.ToString());
                return null;
            }
        }
    }
}
