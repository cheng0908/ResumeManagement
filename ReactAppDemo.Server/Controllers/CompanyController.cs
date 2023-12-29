using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAppDemo.Server.Core.Context;
using ReactAppDemo.Server.Core.Dtos.Company;
using ReactAppDemo.Server.Core.Entities;

namespace ReactAppDemo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper {  get; }
        public CompanyController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD
        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> createcompany([FromBody] CompanyCreateDto dto)
        {
            Company newCompany = _mapper.Map<Company>(dto); //map compant to dto
            await _context.Companies.AddAsync(newCompany);
            await _context.SaveChangesAsync();

            return Ok("Company Created Successfully");
        }
        // Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompanies()
        {
            var companies = await _context.Companies.OrderByDescending(q => q.CreatedAt).ToListAsync(); //await getting all companies
            //var convertedCompanies = _mapper.Map<CompanyGetDto>(companies); //Becafull
            var convertedCompanies = _mapper.Map <IEnumerable<CompanyGetDto>>(companies);

            return Ok(convertedCompanies);
        }
        // Update
        // Delete
    }
}
