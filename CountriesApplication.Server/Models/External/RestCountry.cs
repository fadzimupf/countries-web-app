namespace CountriesApplication.Server.Models.External
{
    public class RestCountry
    {
        public RestCountryName Name { get; set; } = new RestCountryName();
        public int Population { get; set; }
        public List<string> Capital { get; set; } = new List<string>();
        public RestCountryFlag  Flag { get; set; } = new RestCountryFlag();
    }
}
