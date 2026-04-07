using CountriesApplication.Server.Services;
using CountriesApplication.Server.Services.Interfaces;

namespace CountriesApplication.Server.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ICountryService, CountryService>();

            return services;
        }
    }
}
