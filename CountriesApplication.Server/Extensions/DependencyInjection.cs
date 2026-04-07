using CountriesApplication.Server.Clients;
using CountriesApplication.Server.Clients.Interfaces;
using CountriesApplication.Server.Services;
using CountriesApplication.Server.Services.Interfaces;

namespace CountriesApplication.Server.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ICountryService, CountryService>();

            //TODO: Make this an env variable.
            services.AddHttpClient<IRestCountriesAPIClient, RestCountriesAPIClient>(client =>
            {
                client.BaseAddress = new Uri("https://restcountries.com/v3.1/");
            });

            return services;
        }
    }
}
