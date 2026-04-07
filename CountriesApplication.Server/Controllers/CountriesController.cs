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
        public IActionResult GetAll()
        {
            var countries =  _countryService.GetAll();
            return Ok(countries);
        }

        [HttpGet("{name}")]
        [ProducesResponseType(typeof(CountryDetails), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetByName(string name)
        {
            var country = _countryService.GetByName(name);
            
            if (country is null)
                return NotFound();

            return Ok(country);
        }

    }
}
