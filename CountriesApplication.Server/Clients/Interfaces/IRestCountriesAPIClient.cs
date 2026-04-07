using CountriesApplication.Server.Models.External;

namespace CountriesApplication.Server.Clients.Interfaces
{
    public interface IRestCountriesAPIClient
    {
        Task<List<RestCountry>> GetAllAsync();
        Task<RestCountry> GetByNameAsync(string name);
    }
}