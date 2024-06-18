using LookEach.User.SPQuery;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LookEach.Merchant.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IHostEnvironment _webHostEnvironment;
        private static readonly Dictionary<string, string> MimeTypeMappings = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase)
    {
        { ".jpg", "image/jpeg" },
        { ".jpeg", "image/jpeg" },
        { ".png", "image/png" },
        { ".gif", "image/gif" },
        { ".bmp", "image/bmp" },
        { ".tiff", "image/tiff" },
        { ".tif", "image/tiff" },
        { ".svg", "image/svg+xml" },
        { ".webp", "image/webp" }
    };
        public FilesController(IHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("[action]")]
        public async Task<IResult> File(int FileID)
        {
            try
            {
                SPQuery sPQuery = new SPQuery();
                var Filename = await sPQuery.DbFileGet(FileID);

                //Build the File Path.  
                string path = Path.Combine("E:\\Project Code\\Frontend_Practical\\LookEach.Merchant\\LookEach.Merchant\\LookEach.Merchant\\wwwroot\\Files", Filename);  // the video file is in the wwwroot/files folder  
                var filestream = System.IO.File.OpenRead(path);

                return Results.File(filestream, contentType: GetMimeType(Path.GetExtension(Filename)), fileDownloadName: Filename, enableRangeProcessing: true);
            }
            catch
            {
                return Results.BadRequest();
            }
        }

        public static string GetMimeType(string fileExtension)
        {
            if (string.IsNullOrEmpty(fileExtension))
            {
                throw new ArgumentNullException(nameof(fileExtension));
            }

            if (!fileExtension.StartsWith("."))
            {
                fileExtension = "." + fileExtension;
            }

            if (MimeTypeMappings.TryGetValue(fileExtension, out string mimeType))
            {
                return mimeType;
            }

            return "application/octet-stream"; // Default MIME type if not found
        }
    }
}
