using CountriesApplication.Server.Extensions;

var builder = WebApplication.CreateBuilder(args);

var webOrigin = builder.Configuration["WEB_ORIGIN"]
    ?? "";

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddApplicationServices();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowWeb", policy =>
        policy.WithOrigins(webOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowWeb");
app.UseAuthorization();
app.MapControllers();

app.Run();