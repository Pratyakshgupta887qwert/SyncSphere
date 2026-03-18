using Microsoft.Extensions.Options;
using MongoDB.Driver;
using SyncSphere.Models;
using SyncSphere.Settings;

namespace SyncSphere.Services 
{
    public class MeetingsService 
    {
        private readonly IMongoCollection<Meeting> _meetingsCollection;

        public MeetingsService(IMongoDatabase database, IOptions<MongoDbSettings> settings) 
        {
            _meetingsCollection = database.GetCollection<Meeting>(settings.Value.MeetingsCollectionName);
        }

        // 1. CREATE
        public async Task CreateAsync(Meeting meeting) => 
            await _meetingsCollection.InsertOneAsync(meeting);

        // 2. GET ALL (Filtered by Email)
        public async Task<List<Meeting>> GetByEmailAsync(string email) => 
            await _meetingsCollection.Find(m => m.HostEmail == email).ToListAsync();

        // 4. DELETE (The missing piece!)
        public async Task RemoveAsync(string id) => 
            await _meetingsCollection.DeleteOneAsync(x => x.Id == id);
    }
}