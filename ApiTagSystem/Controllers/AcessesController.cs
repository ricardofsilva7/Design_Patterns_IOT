using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiTagSystem;
using ApiTagSystem.Data;

namespace ApiTagSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcessesController : ControllerBase
    {
        private readonly TagSystemContext _context;

        public AcessesController(TagSystemContext context)
        {
            _context = context;
        }

        // GET: api/Acesses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Acesses>>> GetAcesses()
        {
            return await _context.Acesses.ToListAsync();
        }

        // GET: api/Acesses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Acesses>> GetAcesses(int id)
        {
            var acesses = await _context.Acesses.FindAsync(id);

            if (acesses == null)
            {
                return NotFound();
            }

            return acesses;
        }

        // PUT: api/Acesses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcesses(int id, Acesses acesses)
        {
            if (id != acesses.Id)
            {
                return BadRequest();
            }

            _context.Entry(acesses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AcessesExists(id))
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

        // POST: api/Acesses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Acesses>> PostAcesses(Acesses acesses)
        {
            _context.Acesses.Add(acesses);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcesses", new { id = acesses.Id }, acesses);
        }

        // DELETE: api/Acesses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAcesses(int id)
        {
            var acesses = await _context.Acesses.FindAsync(id);
            if (acesses == null)
            {
                return NotFound();
            }

            _context.Acesses.Remove(acesses);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AcessesExists(int id)
        {
            return _context.Acesses.Any(e => e.Id == id);
        }
    }
}
