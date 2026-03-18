// using SyncSphere.Services;
// using SyncSphere.Settings;
// using MongoDB.Driver;

// var builder = WebApplication.CreateBuilder(args);

// // --- 1. CONFIGURATION & DATABASE ---
// builder.Services.Configure<MongoDbSettings>(
//     builder.Configuration.GetSection("MongoDbSettings"));

// builder.Services.AddSingleton<IMongoClient>(sp => {
//     // This looks for "ConnectionString" inside "MongoDbSettings" in your appsettings.json
//     var connString = builder.Configuration.GetValue<string>("MongoDbSettings:ConnectionString");
//     return new MongoClient(connString);
// });

// // --- 2. REGISTER SERVICES ---
// builder.Services.AddSingleton<MeetingsService>();
// builder.Services.AddHostedService<ReminderBackgroundService>();

// builder.Services.AddControllers(); 
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // --- 3. SECURITY (CORS) ---
// builder.Services.AddCors(options => {
//     // options.AddPolicy("AllowReact", policy => {
//     options.AddPolicy("AllowVercel", policy => {
//         // policy.WithOrigins("http://localhost:5173") // React dev server
//         policy.WithOrigins("https://sync-sphere.vercel.app") // Replace with your actual Vercel link
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//     });
// });

// var app = builder.Build();

// // --- 4. MIDDLEWARE PIPELINE ---

// // FORCE SWAGGER (Moved outside the IF block for testing)
// app.UseSwagger();
// app.UseSwaggerUI(c => {
//     c.SwaggerEndpoint("/swagger/v1/swagger.json", "SyncSphere API V1");
//     c.RoutePrefix = "swagger"; // This makes it available at /swagger
// });

// // FIX: Changed from "AllowReact" to "AllowVercel" to match the policy defined above
// app.UseCors("AllowVercel");

// // If you are on Localhost, sometimes HTTPS redirection causes 404s. 
// // Comment this next line out if it still doesn't work.
// // app.UseHttpsRedirection(); 

// app.UseAuthorization();
// app.MapControllers();

// // This tells the server to listen to the dynamic port Render gives it
// var port = Environment.GetEnvironmentVariable("PORT") ?? "5162";
// app.Run($"http://0.0.0.0:{port}");



using SyncSphere.Services;
using SyncSphere.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// --- 1. CONFIGURATION & DATABASE ---
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddSingleton<IMongoClient>(sp => {
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddSingleton<IMongoDatabase>(sp => {
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.DatabaseName);
});

// --- 2. REGISTER SERVICES ---
builder.Services.AddSingleton<MeetingsService>();
// builder.Services.AddHostedService<ReminderBackgroundService>(); // Uncomment if you use this

builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- 3. SECURITY (CORS for Localhost) ---
builder.Services.AddCors(options => {
    options.AddPolicy("AllowLocal", policy => {
        // Pointing back to your local Vite/React server
        policy.WithOrigins("http://localhost:5173") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// --- 4. MIDDLEWARE PIPELINE ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowLocal"); // Using the Local policy

// app.UseHttpsRedirection(); // Keep commented if you face SSL issues locally
app.UseAuthorization();
app.MapControllers();

// REVERTED: Now defaults to 5162 for your local environment
var port = Environment.GetEnvironmentVariable("PORT") ?? "5162";
app.Run($"http://localhost:{port}");