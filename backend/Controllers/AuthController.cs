using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth; // You need 'dotnet add package Google.Apis.Auth'
using SyncSphere.Models;
using MongoDB.Driver;

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

    [HttpPost("google-login")]
    public async Task<IActionResult> GoogleLogin([FromBody] string idToken)
    {
        try
        {
            // 1. Verify token with Google
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
            
            // 2. Check if user exists in MongoDB
            var user = await _users.Find(u => u.Email == payload.Email).FirstOrDefaultAsync();

            if (user == null)
            {
                // 3. New User? Create them!
                user = new User { 
                    Email = payload.Email, 
                    Name = payload.Name, 
                    Picture = payload.Picture 
                };
                await _users.InsertOneAsync(user);
            }

            return Ok(user);
        }
        catch { return BadRequest("Invalid Token"); }
    }
}