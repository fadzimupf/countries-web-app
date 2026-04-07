using CountriesApplication.Server.Controllers;
using CountriesApplication.Server.Models;
using CountriesApplication.Server.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace CountriesApplication.Tests
{
    public class CountriesControllerTests
    {
        private readonly Mock<ICountryService> _mockService;
        private readonly CountriesController _controller;

        public CountriesControllerTests()
        {
            _mockService = new Mock<ICountryService>();
            _controller = new CountriesController(_mockService.Object);
        }

        [Fact]
        public async Task GetAll_Returns200OK_WithListOfCountries()
        {
            var countries = new List<Country>
            {
                new Country { Name = "Germany", Flag = "https://flags.example.com/de.svg" },
                new Country { Name = "South Africa", Flag = "https://flags.example.com/za.svg" }
            };
            _mockService.Setup(s => s.GetAllAsync()).ReturnsAsync(countries);

            var result = await _controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            var returned = Assert.IsType<List<Country>>(okResult.Value);
            Assert.Equal(2, returned.Count);
        }

        [Fact]
        public async Task GetAll_Returns200OK_WithEmptyList_WhenNoCountriesExist()
        {
            _mockService.Setup(s => s.GetAllAsync()).ReturnsAsync(new List<Country>());

            var result = await _controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returned = Assert.IsType<List<Country>>(okResult.Value);
            Assert.Empty(returned);
        }


        [Fact]
        public async Task GetByName_Returns200OK_WithCountryDetails_WhenFound()
        {
            var details = new CountryDetails
            {
                Name = "Federal Republic of Germany",
                Population = 83000000,
                Capital = "Berlin",
                Flag = "https://flags.example.com/de.svg"
            };
            _mockService.Setup(s => s.GetByNameAsync("germany")).ReturnsAsync(details);

            var result = await _controller.GetByName("germany");

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
            var returned = Assert.IsType<CountryDetails>(okResult.Value);
            Assert.Equal("Federal Republic of Germany", returned.Name);
            Assert.Equal("Berlin", returned.Capital);
        }

        [Fact]
        public async Task GetByName_Returns404NotFound_WhenCountryDoesNotExist()
        {
            _mockService.Setup(s => s.GetByNameAsync("unknowncountry")).ReturnsAsync((CountryDetails)null);

            var result = await _controller.GetByName("unknowncountry");

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task GetByName_PassesNameToService_Correctly()
        {
            _mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ReturnsAsync((CountryDetails)null);

            await _controller.GetByName("france");

            _mockService.Verify(s => s.GetByNameAsync("france"), Times.Once);
        }
    }
}