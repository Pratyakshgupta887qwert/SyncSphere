using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SyncSphere.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        
        // This is where we will store the user's password
        public string Password { get; set; } = null!; 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}