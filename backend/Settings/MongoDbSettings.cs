namespace SyncSphere.Settings {
    public class MongoDbSettings {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string MeetingsCollectionName { get; set; } = null!;
    }
}