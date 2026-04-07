using CountriesApplication.Server.Models;
using CountriesApplication.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CountriesApplication.Server.Controllers
{
    [ApiController]
    [Route("countries")]
    public class CountriesController : ControllerBase
    {
        private readonly ICountryService _countryService;

        public CountriesController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Country>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var countries =  await _countryService.GetAllAsync();
            return Ok(countries);
        }

        [HttpGet("{name}")]
        [ProducesResponseType(typeof(CountryDetails), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByName(string name)
        {
            var country = await _countryService.GetByNameAsync(name);
            
            if (country is null)
                return NotFound();

            return Ok(country);
        }
    }
}
