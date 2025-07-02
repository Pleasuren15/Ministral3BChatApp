using ChatApp.Api.Endpoints;
using Microsoft.OpenApi.Models;

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

            //Add swagger services
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "ChatApp API",
                    Version = "v1"
                });
            });

            var app = builder.Build();
            // Configure Swagger middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.MapAddChatBotEndpoints();

            app.Run();
        }
    }
}
