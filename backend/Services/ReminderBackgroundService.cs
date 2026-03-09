using SyncSphere.Services;

namespace SyncSphere.Services
{
    public class ReminderBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<ReminderBackgroundService> _logger;

        public ReminderBackgroundService(IServiceProvider serviceProvider, ILogger<ReminderBackgroundService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("SyncSphere Reminder Service is starting...");

            // This loop runs as long as the backend is turned on
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Checking for upcoming meetings at: {time}", DateTimeOffset.Now);

                using (var scope = _serviceProvider.CreateScope())
                {
                    // We get the MeetingsService to talk to MongoDB
                    var meetingsService = scope.ServiceProvider.GetRequiredService<MeetingsService>();

                    // 1. Get all meetings from MongoDB
                    // In a real app, you would filter for meetings starting in the next 10 minutes
                    var allMeetings = await meetingsService.GetAllAsync();

                    foreach (var meeting in allMeetings)
                    {
                        // Logic for Timezone-Aware Reminders:
                        // Compare meeting.ScheduledTime (UTC) with DateTime.UtcNow
                        
                        var timeUntilMeeting = meeting.ScheduledTime - DateTime.UtcNow;

                        // If the meeting starts in 10 minutes and we haven't sent a reminder yet
                        if (timeUntilMeeting.TotalMinutes <= 10 && timeUntilMeeting.TotalMinutes > 0)
                        {
                            _logger.LogWarning($"REMINDER: Meeting '{meeting.Title}' starts soon for {meeting.HostEmail}!");
                            
                            // TODO: Trigger Twilio SMS or Send a Push Notification here
                        }
                    }
                }

                // Wait for 1 minute before checking again
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}