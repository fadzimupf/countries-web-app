using CountriesApplication.Server.Clients;
using CountriesApplication.Server.Clients.Interfaces;
using CountriesApplication.Server.Models;
using CountriesApplication.Server.Services.Interfaces;

namespace CountriesApplication.Server.Services
{
    public class CountryService : ICountryService
    {
        private readonly IRestCountriesAPIClient _restCountriesClient;

        public CountryService(IRestCountriesAPIClient restCountriesClient)
        {
            _restCountriesClient = restCountriesClient;
        }

        public async Task<List<Country>> GetAllAsync()
        {
            var restCountries = await _restCountriesClient.GetAllAsync();

            return restCountries.Select(c => new Country
            {
                Name = c.Name.Official,
                Flag = c.Flags.Svg
            }).ToList();
        }

        public async Task<CountryDetails> GetByNameAsync(string name)
        {
            var country = await _restCountriesClient.GetByNameAsync(name);

            return new CountryDetails
            {
                Name = country.Name.Official,
                Population = country.Population,
                Capital = country.Capital.FirstOrDefault() ?? string.Empty,
                Flag = country.Flags.Svg
            };
        }
    }
}
