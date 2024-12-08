using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TagSystemAPI.Data;
using TagSystemAPI.Models;

namespace TagSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly TagSystemContext _context;

        public AccessController(TagSystemContext context)
        {
            _context = context;
        }

        // GET: api/Access
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Access>>> GetAccess()
        {
            return await _context.Access.ToListAsync();
        }

        [HttpGet("total")]
        public async Task<ActionResult<IEnumerable<Access>>> GetTotalAccess()
        {
            //consulta para retornar o número total de linhas da tabela 'Access'
            var TotalAccess = await _context.Access.CountAsync();
            return Ok(new { TotalAccess });
        }

        [HttpGet("latest")]
        public async Task<ActionResult<IEnumerable<Access>>> GetLatestAccess()
        {
            //consulta para retornar a data do último acesso
            var LatestAccess = await _context.Access.OrderByDescending(la => la.TimeAccess).FirstOrDefaultAsync();
            return Ok(new { LatestAccess });
        }

        [HttpGet("dailyaccess")]
        public async Task<ActionResult<IEnumerable<Access>>> GetDailyAccess()
        {
            //consulta para retornar o número total de linhas da tabela 'Access'
            var TotalAccess = await _context.Access.CountAsync();
            return Ok(new { TotalAccess });
        }

        // GET: api/Access/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Access>> GetAccess(int id)
        {
            var access = await _context.Access.FindAsync(id);

            if (access == null)
            {
                return NotFound();
            }

            return access;
        }

        // PUT: api/Access/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccess(int id, Access access)
        {
            if (id != access.Id)
            {
                return BadRequest();
            }

            _context.Entry(access).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccessExists(id))
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

        // POST: api/Access
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Access>> PostAccess(AccessDTO accessDTO)
        {
            // Devemos verificar se o rfid já existe na tabela User para autorizar ou não o acesso
            // e preencher o campo 'isAuthorized' com 'true' ou 'false'

            // Consulta para buscar o 'rfid' na tabela 'user'
            var AccessAuthorized = await _context.Users.AnyAsync(u => u.Rfid == accessDTO.Rfid);

            var access = new Access
            {
                Rfid = accessDTO.Rfid,
                Room = accessDTO.Room,
                TimeAccess = accessDTO.TimeAccess,
                // armazena o resultado da consulta no campo 'isAuthorized'
                IsAuthorized = AccessAuthorized,
            };

            _context.Access.Add(access);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccess", new { id = access.Id }, access);
        }

        // DELETE: api/Access/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccess(int id)
        {
            var access = await _context.Access.FindAsync(id);
            if (access == null)
            {
                return NotFound();
            }

            _context.Access.Remove(access);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccessExists(int id)
        {
            return _context.Access.Any(e => e.Id == id);
        }
    }
}
