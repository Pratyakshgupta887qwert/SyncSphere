using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;
using SyncSphere.Models;
using SyncSphere.Services;
using MongoDB.Driver;

namespace SyncSphere.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;
        private readonly IConfiguration _config;

        public AuthController(IMongoDatabase database, IConfiguration config)
        {
            // Connects to your "Users" collection in MongoDB
            _users = database.GetCollection<User>("Users");
            _config = config;
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleAuthDto dto)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { "353898754871-b7afe3qhrq6hslbv9bv9nt70g55f45db.apps.googleusercontent.com" }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(dto.IdToken, settings);

                // Find or Create user
                var user = await _users.Find(u => u.Email == payload.Email).FirstOrDefaultAsync();

                if (user == null)
                {
                    user = new User
                    {
                        Name = payload.Name,
                        Email = payload.Email,
                        Password = "" // OAuth users don't need a local password
                    };
                    await _users.InsertOneAsync(user);
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest("Invalid Google Token: " + ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            // Secure check: verify both email and password
            var user = await _users.Find(u => u.Email == dto.Email && u.Password == dto.Password).FirstOrDefaultAsync();
            if (user == null) return Unauthorized("Invalid credentials.");
            
            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var existing = await _users.Find(u => u.Email == dto.Email).FirstOrDefaultAsync();
            if (existing != null) return BadRequest("User already exists.");

            var newUser = new User 
            { 
                Name = dto.Name, 
                Email = dto.Email, 
                Password = dto.Password 
            };
            
            await _users.InsertOneAsync(newUser);
            return Ok(newUser);
        }
    }
}