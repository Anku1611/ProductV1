using CustomerProductCoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomerProductCoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ProductDBContext _context;

        public WeatherForecastController(ProductDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Products>> Get()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpPost]
        public async Task<OkResult> Post(Products product)
        {
            _context.Add(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}