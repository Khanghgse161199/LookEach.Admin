using DevExpress.Pdf.Native.BouncyCastle.Asn1.Ocsp;
using LookEach.User.SPQuery;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Cryptography;

namespace LookEach.Merchant.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IHostEnvironment _webHostEnvironment;

        public UploadController(IHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost("[action]")]
        [RequestSizeLimit(500 * 1024 * 1024)]       //unit is bytes => 500Mb
        [RequestFormLimits(MultipartBodyLengthLimit = 500 * 1024 * 1024)]
        public async Task<IActionResult> Upload(IFormFile myFile, [FromForm] int FileSize, [FromForm] string FileType, [FromForm] int FileDuration, [FromForm] string ThumbnailData, [FromForm] string FileName = "")
        {
            try
            {
                if (FileName == "")
                {
                    FileName = Guid.NewGuid().ToString();
                }

                //var fileExtension = Path.GetExtension(myFile.FileName);
                var filePath = Path.Combine("E:\\Project Code\\Frontend_Practical\\LookEach.Merchant\\LookEach.Merchant\\LookEach.Merchant\\wwwroot\\Files", FileName + FileType);
                var hash = "";

                if (myFile.Length > 0)
                {
                    using (Stream fileStream = new FileStream(filePath, FileMode.CreateNew))
                    {
                        myFile.CopyTo(fileStream);
                    }
                    hash = await GetMD5Hash(myFile);
                    if (hash != "")
                    {
                        SPQuery sPQuery = new SPQuery();
                        var json = await sPQuery.DbFileSave(FileSize, FileType, FileDuration, ThumbnailData, FileName);
                        return new OkObjectResult(json);
                    }
                }

            }
            catch
            {
                return BadRequest();
            }
            return BadRequest();
        }
        private async Task<string> GetMD5Hash(IFormFile file)
        {
            // get stream from file then convert it to a MemoryStream
            MemoryStream stream = new MemoryStream();
            file.OpenReadStream().CopyTo(stream);
            // compute md5 hash of the file's byte array.
            byte[] bytes = MD5.Create().ComputeHash(stream.ToArray());
            return BitConverter.ToString(bytes).Replace("-", string.Empty).ToLower();
        }
    }
}
