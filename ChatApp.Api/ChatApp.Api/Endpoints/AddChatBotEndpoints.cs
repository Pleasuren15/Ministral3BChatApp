using Azure;
using Azure.AI.Inference;

namespace ChatApp.Api.Endpoints
{
    /// <summary>
    /// Provides endpoints for adding chat bots.
    /// </summary>
    public static class AddChatBotEndpoints
    {
        /// <summary>
        /// Maps the endpoints for adding chat bots to the service collection.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void MapAddChatBotEndpoints(this WebApplication app)
        {
            var chatGroup = app.MapGroup("/api/Chat");
            chatGroup.MapGet("query", GetMistralResponseAsync);
        }

        private static async Task<IResult> GetMistralResponseAsync(string query, IConfiguration configuration)
        {
            var config = configuration.GetSection("AzureAiFoundry");
            var endpoint = new Uri(config.GetValue<string>("Endpoint")!);
            var credential = new AzureKeyCredential(config.GetValue<string>("ApiKey")!);
            var modelId = config.GetValue<string>("ModelId");

            var client = new ChatCompletionsClient(endpoint: endpoint,
                                        credential: credential,
                                        options: new AzureAIInferenceClientOptions(AzureAIInferenceClientOptions.ServiceVersion.V2024_05_01_Preview)
                                    );

            var requestOptions = new ChatCompletionsOptions()
            {
                Messages = { new ChatRequestUserMessage($"{query}") },
                MaxTokens = 2048,
                Temperature = 0.8f,
                NucleusSamplingFactor = 0.1f,
                Model = modelId
            };

            Response<ChatCompletions> response = client.Complete(requestOptions);

            return response is not null ? Results.Ok(response.Value.Content) : Results.NoContent();
        }
    }
}
