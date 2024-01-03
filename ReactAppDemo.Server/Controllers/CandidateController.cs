using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAppDemo.Server.Core.Context;
using ReactAppDemo.Server.Core.Dtos.Candidate;
using ReactAppDemo.Server.Core.Dtos.Job;
using ReactAppDemo.Server.Core.Entities;
using Azure.Storage.Files;
using Azure.Storage.Files.Shares;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Extensions.Configuration;
using System.Security.AccessControl;

namespace ReactAppDemo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {   
        private readonly IConfiguration _configuration;
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }
        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        // CRUD

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDto dto, IFormFile pdfFile) //From Form, not from body
        {
            var fiveMegaByte = 5 * 1024 * 1024;
            var pdfMimeType = "application/pdf";
            if (pdfFile.Length > fiveMegaByte || pdfFile.ContentType != pdfMimeType)
            {
                return BadRequest("File is not valid");
            }

            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
            //var storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=cloudstorageonazure;AccountKey=oHlr3qdteTrx1E4J1kNI6l7IdogxbEpK/9D9V34oByNIbaTDo3si22cnXMUOgz0Kz9hZrYPe4O+W+ASthr4j4Q==;EndpointSuffix=core.windows.net";
            //var shareName = "documents";
            //var shareServiceClient = new ShareServiceClient(storageConnectionString);
            //var shareClient = shareServiceClient.GetShareClient(shareName);

            //// Create the directory if it doesn't exist
            //var directoryClient = shareClient.GetDirectoryClient("pdfs");
            //await directoryClient.CreateIfNotExistsAsync();

            //// Upload the file to Azure File Share
            //var fileClient = directoryClient.GetFileClient(resumeUrl);
            //using (var stream = new MemoryStream())
            //{
            //    await pdfFile.CopyToAsync(stream);
            //    stream.Position = 0;
            //    await fileClient.UploadAsync(stream, null);
            //}
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", resumeUrl);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }

            var newCandidate = _mapper.Map<Candidate>(dto);
            newCandidate.ResumeUrl = resumeUrl;
            await _context.Candidates.AddAsync(newCandidate);
            await _context.SaveChangesAsync();

            return Ok("Candidate Saved Successsfully");
        }

        //Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CandidateGetDto>>> GetCandidates()
        {
            var candidates = await _context.Candidates.Include(c => c.Job).OrderByDescending(q => q.CreatedAt).ToListAsync();
            var convertedCandidates = _mapper.Map<IEnumerable<CandidateGetDto>>(candidates);

            return Ok(convertedCandidates);
        }

        //Read (Download PDF File)
        [HttpGet]
        [Route("download/{url}")]
        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File Not Found!!!");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);
            return file;

        }
    }
}
