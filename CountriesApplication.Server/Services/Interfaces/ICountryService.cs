using CountriesApplication.Server.Models;

namespace CountriesApplication.Server.Services.Interfaces
{
    public interface ICountryService
    {
        List<Country> GetAll();
        CountryDetails GetByName(string name);
    }
}
