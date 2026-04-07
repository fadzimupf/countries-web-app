using CountriesApplication.Server.Models;

namespace CountriesApplication.Server.Services.Interfaces
{
    public interface ICountryService
    {
        Task<List<Country>> GetAllAsync();
        Task<CountryDetails> GetByNameAsync(string name);
    }
}
