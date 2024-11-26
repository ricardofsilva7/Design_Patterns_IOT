using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TagSystemAPI.Data;
using TagSystemAPI.Models;

namespace TagSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeniedsController : ControllerBase
    {
        private readonly TagSystemAPIContext _context;

        public DeniedsController(TagSystemAPIContext context)
        {
            _context = context;
        }

        // GET: api/Denieds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Denied>>> GetDenied()
        {
            return await _context.Denied.ToListAsync();
        }

        // GET: api/Denieds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Denied>> GetDenied(int id)
        {
            var denied = await _context.Denied.FindAsync(id);

            if (denied == null)
            {
                return NotFound();
            }

            return denied;
        }

        // PUT: api/Denieds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDenied(int id, Denied denied)
        {
            if (id != denied.DeniedId)
            {
                return BadRequest();
            }

            _context.Entry(denied).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeniedExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Denieds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Denied>> PostDenied(Denied denied)
        {
            _context.Denied.Add(denied);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDenied", new { id = denied.DeniedId }, denied);
        }

        // DELETE: api/Denieds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDenied(int id)
        {
            var denied = await _context.Denied.FindAsync(id);
            if (denied == null)
            {
                return NotFound();
            }

            _context.Denied.Remove(denied);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeniedExists(int id)
        {
            return _context.Denied.Any(e => e.DeniedId == id);
        }
    }
}
