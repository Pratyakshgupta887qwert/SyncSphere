using Microsoft.Extensions.Options;
using MongoDB.Driver;
using SyncSphere.Models;
using SyncSphere.Settings;

namespace SyncSphere.Services {
    public class MeetingsService {
        private readonly IMongoCollection<Meeting> _meetingsCollection;

        public MeetingsService(IOptions<MongoDbSettings> settings) {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _meetingsCollection = database.GetCollection<Meeting>(settings.Value.MeetingsCollectionName);
            Console.WriteLine("Successfully connected to MongoDB Atlas!");
        }

        public async Task CreateAsync(Meeting meeting) => await _meetingsCollection.InsertOneAsync(meeting);
        public async Task<List<Meeting>> GetAllAsync() => await _meetingsCollection.Find(_ => true).ToListAsync();
    }
}