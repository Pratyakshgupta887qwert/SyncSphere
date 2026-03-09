using Microsoft.AspNetCore.Mvc;
using SyncSphere.Models;
using SyncSphere.Services;

namespace SyncSphere.Controllers {
    [ApiController]
    [Route("api/[controller]")] // This makes the URL /api/meetings
    public class MeetingsController : ControllerBase {
        private readonly MeetingsService _service;

        public MeetingsController(MeetingsService service) => _service = service;

        [HttpPost]
        public async Task<IActionResult> Post(Meeting meeting) {
            await _service.CreateAsync(meeting);
            return Ok(meeting);
        }

        [HttpGet]
        public async Task<List<Meeting>> Get() => await _service.GetAllAsync();
    }
}