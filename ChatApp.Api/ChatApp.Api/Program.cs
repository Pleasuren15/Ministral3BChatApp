using ChatApp.Api.Endpoints;

namespace ChatApp.Api
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");
            builder.Services.AddLogging();

            var app = builder.Build();
            app.MapAddChatBotEndpoints();

            app.RunAsync();
        }
    }
}
