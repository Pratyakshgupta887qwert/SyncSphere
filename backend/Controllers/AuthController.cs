using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SyncSphere.Models;

namespace SyncSphere.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;

        public AuthController(IMongoClient client)
        {
            var database = client.GetDatabase("SyncSphereDB");
            _users = database.GetCollection<User>("Users");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            // Check if user already exists
            var existingUser = await _users.Find(u => u.Email == dto.Email).FirstOrDefaultAsync();
            if (existingUser != null) return BadRequest("User already exists!");

            var newUser = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password // In a real app, you would hash this!
            };

            await _users.InsertOneAsync(newUser);
            return Ok(newUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            // Find user with matching email AND password
            var user = await _users.Find(u => u.Email == dto.Email && u.Password == dto.Password).FirstOrDefaultAsync();
            
            if (user == null) return Unauthorized("Invalid Email or Password");

            return Ok(user);
        }
    }
}