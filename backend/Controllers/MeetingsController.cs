using Microsoft.AspNetCore.Mvc;
using SyncSphere.Models;
using SyncSphere.Services;

namespace SyncSphere.Controllers 
{
    [ApiController]
    [Route("api/[controller]")] 
    public class MeetingsController : ControllerBase 
    {
        private readonly MeetingsService _service;

        public MeetingsController(MeetingsService service) => _service = service;

        [HttpPost]
        public async Task<IActionResult> Post(Meeting meeting) 
        {
            await _service.CreateAsync(meeting);
            return Ok(meeting);
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Query parameter 'email' is required.");
            }

            var meetings = await _service.GetByEmailAsync(email);
            return Ok(meetings);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id) 
        {
            await _service.RemoveAsync(id);
            return NoContent(); 
        }
    }
}