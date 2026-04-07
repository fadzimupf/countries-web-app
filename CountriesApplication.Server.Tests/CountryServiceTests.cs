using CountriesApplication.Server.Clients.Interfaces;
using CountriesApplication.Server.Models;
using CountriesApplication.Server.Models.External;
using CountriesApplication.Server.Services;
using Moq;
using Xunit;

namespace CountriesApplication.Tests
{
    public class CountryServiceTests
    {
        private readonly Mock<IRestCountriesAPIClient> _mockClient;
        private readonly CountryService _service;

        public CountryServiceTests()
        {
            _mockClient = new Mock<IRestCountriesAPIClient>();
            _service = new CountryService(_mockClient.Object);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsMappedAndSortedCountries()
        {
            var restCountries = new List<RestCountry>
            {
                new RestCountry
                {
                    Name = new RestCountryName { Official = "Republic of Zimbabwe" },
                    Flags = new RestCountryFlag { Svg = "https://flags.example.com/zw.svg" },
                    Population = 15000000,
                    Capital = new List<string> { "Harare" }
                },
                new RestCountry
                {
                    Name = new RestCountryName { Official = "Republic of Angola" },
                    Flags = new RestCountryFlag { Svg = "https://flags.example.com/ao.svg" },
                    Population = 33000000,
                    Capital = new List<string> { "Luanda" }
                }
            };
            _mockClient.Setup(c => c.GetAllAsync()).ReturnsAsync(restCountries);

            var result = await _service.GetAllAsync();

            Assert.Equal(2, result.Count);
            Assert.Equal("Republic of Angola", result[0].Name);
            Assert.Equal("Republic of Zimbabwe", result[1].Name);
        }

        [Fact]
        public async Task GetAllAsync_MapsFlagCorrectly()
        {
            var restCountries = new List<RestCountry>
            {
                new RestCountry
                {
                    Name = new RestCountryName { Official = "South Africa" },
                    Flags = new RestCountryFlag { Svg = "https://flags.example.com/za.svg" },
                    Population = 60000000,
                    Capital = new List<string> { "Pretoria" }
                }
            };
            _mockClient.Setup(c => c.GetAllAsync()).ReturnsAsync(restCountries);

            var result = await _service.GetAllAsync();

            Assert.Equal("https://flags.example.com/za.svg", result[0].Flag);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsEmptyList_WhenClientReturnsEmpty()
        {
            _mockClient.Setup(c => c.GetAllAsync()).ReturnsAsync(new List<RestCountry>());

            var result = await _service.GetAllAsync();

            Assert.NotNull(result);
            Assert.Empty(result);
        }


        [Fact]
        public async Task GetByNameAsync_ReturnsMappedCountryDetails()
        {
            var restCountry = new RestCountry
            {
                Name = new RestCountryName { Official = "Federal Republic of Germany" },
                Flags = new RestCountryFlag { Svg = "https://flags.example.com/de.svg" },
                Population = 83000000,
                Capital = new List<string> { "Berlin" }
            };
            _mockClient.Setup(c => c.GetByNameAsync("germany")).ReturnsAsync(restCountry);

            var result = await _service.GetByNameAsync("germany");

            Assert.NotNull(result);
            Assert.Equal("Federal Republic of Germany", result.Name);
            Assert.Equal(83000000, result.Population);
            Assert.Equal("Berlin", result.Capital);
            Assert.Equal("https://flags.example.com/de.svg", result.Flag);
        }

        [Fact]
        public async Task GetByNameAsync_UsesFirstCapital_WhenMultipleCapitalsExist()
        {
            var restCountry = new RestCountry
            {
                Name = new RestCountryName { Official = "Republic of South Africa" },
                Flags = new RestCountryFlag { Svg = "https://flags.example.com/za.svg" },
                Population = 60000000,
                Capital = new List<string> { "Pretoria", "Cape Town", "Bloemfontein" }
            };
            _mockClient.Setup(c => c.GetByNameAsync("south africa")).ReturnsAsync(restCountry);

            var result = await _service.GetByNameAsync("south africa");

            Assert.Equal("Pretoria", result.Capital);
        }

        [Fact]
        public async Task GetByNameAsync_UsesEmptyStringForCapital_WhenCapitalListIsEmpty()
        {
            var restCountry = new RestCountry
            {
                Name = new RestCountryName { Official = "Some Country" },
                Flags = new RestCountryFlag { Svg = "https://flags.example.com/xx.svg" },
                Population = 5000,
                Capital = new List<string>()
            };
            _mockClient.Setup(c => c.GetByNameAsync("somecountry")).ReturnsAsync(restCountry);

            var result = await _service.GetByNameAsync("somecountry");

            Assert.Equal(string.Empty, result.Capital);
        }

        [Fact]
        public async Task GetByNameAsync_PassesNameToClient_Correctly()
        {
            var restCountry = new RestCountry
            {
                Name = new RestCountryName { Official = "France" },
                Flags = new RestCountryFlag { Svg = "https://flags.example.com/fr.svg" },
                Population = 68000000,
                Capital = new List<string> { "Paris" }
            };
            _mockClient.Setup(c => c.GetByNameAsync("france")).ReturnsAsync(restCountry);

            await _service.GetByNameAsync("france");

            _mockClient.Verify(c => c.GetByNameAsync("france"), Times.Once);
        }
    }
}