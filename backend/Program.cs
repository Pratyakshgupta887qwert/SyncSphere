using SyncSphere.Services;
using SyncSphere.Settings;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// --- 1. CONFIGURATION & DATABASE ---
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddSingleton<IMongoClient>(sp => {
    // This looks for "ConnectionString" inside "MongoDbSettings" in your appsettings.json
    var connString = builder.Configuration.GetValue<string>("MongoDbSettings:ConnectionString");
    return new MongoClient(connString);
});

// --- 2. REGISTER SERVICES ---
builder.Services.AddSingleton<MeetingsService>();
builder.Services.AddHostedService<ReminderBackgroundService>();

builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- 3. SECURITY (CORS) ---
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// --- 4. MIDDLEWARE PIPELINE ---

// FORCE SWAGGER (Moved outside the IF block for testing)
app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "SyncSphere API V1");
    c.RoutePrefix = "swagger"; // This makes it available at /swagger
});

app.UseCors("AllowReact");

// If you are on Localhost, sometimes HTTPS redirection causes 404s. 
// Comment this next line out if it still doesn't work.
// app.UseHttpsRedirection(); 

app.UseAuthorization();
app.MapControllers();

app.Run();