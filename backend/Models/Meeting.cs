using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SyncSphere.Models {
    public class Meeting {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Title { get; set; } = null!;
        public string HostEmail { get; set; } = null!;
        public DateTime ScheduledTime { get; set; }
        public string HostTimezone { get; set; } = "UTC";
    }
}