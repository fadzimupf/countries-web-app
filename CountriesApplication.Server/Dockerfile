FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs

FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["CountriesApplication.Server/CountriesApplication.Server.csproj", "CountriesApplication.Server/"]
COPY ["countriesapplication.client/countriesapplication.client.esproj", "countriesapplication.client/"]
RUN dotnet restore "./CountriesApplication.Server/CountriesApplication.Server.csproj"
COPY . .
WORKDIR "/src/CountriesApplication.Server"
RUN dotnet build "./CountriesApplication.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./CountriesApplication.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CountriesApplication.Server.dll"]