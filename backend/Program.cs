using SyncSphere.Services;
using SyncSphere.Settings;

var builder = WebApplication.CreateBuilder(args);

// 1. ADD SERVICES (The "Setup" Phase)

// This line tells the app to find your MongoDB link in 'appsettings.json'
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));

// This registers your Meeting Logic so the Controllers can use it
builder.Services.AddSingleton<MeetingsService>();

// This starts your Reminder background timer
builder.Services.AddHostedService<ReminderBackgroundService>();

builder.Services.AddControllers(); // Required for [ApiController] to work
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // This gives you the testing UI

// 2. SECURITY (CORS)
// This allows your React app (Port 5173) to send data to this API
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 3. CONFIGURE THE ENGINE (The "Running" Phase)

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Important: CORS must come before Authorization
app.UseCors("AllowReact");

app.UseHttpsRedirection();
app.UseAuthorization();

// This line tells .NET to look at your "Controllers" folder for URLs
app.MapControllers();

app.Run();