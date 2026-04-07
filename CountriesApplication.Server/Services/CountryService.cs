using CountriesApplication.Server.Models;
using CountriesApplication.Server.Services.Interfaces;

namespace CountriesApplication.Server.Services
{
    public class CountryService : ICountryService
    {
        public List<Country> GetAll()
        {
            return new List<Country> { new Country { Name = "Republic of South Africa", Flag = "https://flagcdn.com/am.svg" } };
        }

        public CountryDetails GetByName(string name)
        {
            return new CountryDetails { Name = "Republic of South Africa" };
        }
    }
}
