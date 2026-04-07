using System.Net;
using System.Text;
using CountriesApplication.Server.Clients;
using CountriesApplication.Server.Models.External;
using Moq;
using Moq.Protected;
using Newtonsoft.Json;

namespace CountriesApplication.Tests
{
    public class RestCountriesAPIClientTests
    {
        private HttpClient CreateHttpClient(HttpStatusCode statusCode, string jsonContent)
        {
            var handlerMock = new Mock<HttpMessageHandler>();
            handlerMock
                .Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = statusCode,
                    Content = new StringContent(jsonContent, Encoding.UTF8, "application/json")
                });

            return new HttpClient(handlerMock.Object)
            {
                BaseAddress = new Uri("https://restcountries.com/v3.1/")
            };
        }

        [Fact]
        public async Task GetAllAsync_ReturnsDeserializedList_WhenResponseIsValid()
        {
            var countries = new List<RestCountry>
            {
                new RestCountry
                {
                    Name = new RestCountryName { Official = "Republic of South Africa" },
                    Flags = new RestCountryFlag { Png = "https://flags.example.com/za.svg" },
                    Population = 60000000,
                    Capital = new List<string> { "Pretoria" }
                }
            };
            var json = JsonConvert.SerializeObject(countries);
            var client = new RestCountriesAPIClient(CreateHttpClient(HttpStatusCode.OK, json));

            var result = await client.GetAllAsync();

            Assert.NotNull(result);
            Assert.Single(result);
            Assert.Equal("Republic of South Africa", result[0].Name.Official);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsEmptyList_WhenResponseIsNullJson()
        {
            var client = new RestCountriesAPIClient(CreateHttpClient(HttpStatusCode.OK, "null"));

            var result = await client.GetAllAsync();

            Assert.NotNull(result);
            Assert.Empty(result);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsEmptyList_WhenResponseIsEmptyArray()
        {
            var client = new RestCountriesAPIClient(CreateHttpClient(HttpStatusCode.OK, "[]"));

            var result = await client.GetAllAsync();

            Assert.NotNull(result);
            Assert.Empty(result);
        }

        [Fact]
        public async Task GetByNameAsync_ReturnsFirstCountry_WhenFound()
        {
            var countries = new List<RestCountry>
            {
                new RestCountry
                {
                    Name = new RestCountryName { Official = "Federal Republic of Germany" },
                    Flags = new RestCountryFlag { Png = "https://flags.example.com/de.svg" },
                    Population = 83000000,
                    Capital = new List<string> { "Berlin" }
                }
            };
            var json = JsonConvert.SerializeObject(countries);
            var client = new RestCountriesAPIClient(CreateHttpClient(HttpStatusCode.OK, json));

            var result = await client.GetByNameAsync("germany");

            Assert.NotNull(result);
            Assert.Equal("Federal Republic of Germany", result.Name.Official);
        }

        [Fact]
        public async Task GetByNameAsync_ReturnsNull_WhenNotFound()
        {
            var client = new RestCountriesAPIClient(CreateHttpClient(HttpStatusCode.NotFound, "{}"));

            var result = await client.GetByNameAsync("unknowncountry");

            Assert.Null(result);
        }

        [Fact]
        public async Task GetByNameAsync_ReturnsNull_WhenResponseIsEmptyArray()
        {
            var client = new RestCountriesAPIClient(CreateHttpClient(HttpStatusCode.OK, "[]"));

            var result = await client.GetByNameAsync("empty");

            Assert.Null(result);
        }

        [Fact]
        public async Task GetByNameAsync_ReturnsFirstCountry_WhenMultipleMatchesReturned()
        {
            var countries = new List<RestCountry>
            {
                new RestCountry
                {
                    Name = new RestCountryName { Official = "Country One" },
                    Flags = new RestCountryFlag { Png = "https://flags.example.com/one.svg" },
                    Population = 1000,
                    Capital = new List<string> { "Capital One" }
                },
                new RestCountry
                {
                    Name = new RestCountryName { Official = "Country Two" },
                    Flags = new RestCountryFlag { Png = "https://flags.example.com/two.svg" },
                    Population = 2000,
                    Capital = new List<string> { "Capital Two" }
                }
            };
            var json = JsonConvert.SerializeObject(countries);
            var client = new RestCountriesAPIClient(CreateHttpClient(HttpStatusCode.OK, json));

            var result = await client.GetByNameAsync("country");

            Assert.Equal("Country One", result.Name.Official);
        }
    }
}