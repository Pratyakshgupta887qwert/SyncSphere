using Microsoft.Extensions.Options;
using MongoDB.Driver;
using SyncSphere.Models;
using SyncSphere.Settings;

namespace SyncSphere.Services 
{
    public class MeetingsService 
    {
        private readonly IMongoCollection<Meeting> _meetingsCollection;

        public MeetingsService(IOptions<MongoDbSettings> settings) 
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _meetingsCollection = database.GetCollection<Meeting>(settings.Value.MeetingsCollectionName);
            Console.WriteLine("Successfully connected to MongoDB Atlas!");
        }

        // 1. CREATE
        public async Task CreateAsync(Meeting meeting) => 
            await _meetingsCollection.InsertOneAsync(meeting);

        // 2. GET ALL (Filtered by Email)
        public async Task<List<Meeting>> GetByEmailAsync(string email) => 
            await _meetingsCollection.Find(x => x.HostEmail == email).ToListAsync();

        // 3. GET ALL (Unfiltered - optional)
        public async Task<List<Meeting>> GetAllAsync() => 
            await _meetingsCollection.Find(_ => true).ToListAsync();

        // 4. DELETE (The missing piece!)
        public async Task RemoveAsync(string id) => 
            await _meetingsCollection.DeleteOneAsync(x => x.Id == id);
    }
}