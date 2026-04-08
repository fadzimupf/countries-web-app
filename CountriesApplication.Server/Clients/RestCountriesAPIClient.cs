using CountriesApplication.Server.Clients.Interfaces;
using CountriesApplication.Server.Models.External;
using Newtonsoft.Json;

namespace CountriesApplication.Server.Clients
{
    public class RestCountriesAPIClient : IRestCountriesAPIClient
    {
        private readonly HttpClient _httpClient;

        public RestCountriesAPIClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<RestCountry>> GetAllAsync()
        {
            var response = await _httpClient.GetStringAsync("all?fields=name,flags,population,capital");
            
            return JsonConvert.DeserializeObject<List<RestCountry>>(response) ?? [];
        }

        public async Task<RestCountry?> GetByNameAsync(string name)
        {
            var response = await _httpClient.GetAsync($"name/{name}");

            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var countries = JsonConvert.DeserializeObject<List<RestCountry>>(json);

            return countries?.FirstOrDefault();
        }
    }
}
