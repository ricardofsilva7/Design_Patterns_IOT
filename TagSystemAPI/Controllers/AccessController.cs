using System.Linq;
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

        [HttpGet("rejected")]
        public async Task<ActionResult<IEnumerable<Access>>> GetRejectedAccess()
        {
            //consulta para retornar o número de tentativas de acesso à sala
            var RejectAccess = await _context.Access.Where(ra => ra.IsAuthorized == false).CountAsync();
            return Ok(new { RejectAccess });
        }

        [HttpGet("accesshistory")]
        public async Task<ActionResult<IEnumerable<object>>> GetAccessHistory()
        {
            //consulta para retornar o histórico de acessos 
            /*
             schema:
             Nome (Users.Name),
             Cargo (Users.Role),
             Horário de entrada (Access.TimeAccess),
             Tag ativa (Access.isAuthorized),
             Local (Access.Room)
            */
            
            var accessHistory = await _context.Access
                .Join(_context.Users, access => access.Id, user => user.Id,(access, user) =>
                new 
                {
                    Nome = user.Name,
                    Cargo = user.Role,
                    HorarioEntrada = access.TimeAccess,
                    TagAtiva = access.IsAuthorized,
                    Local = access.Room
                })
                .ToListAsync();

            return Ok(accessHistory);
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
            var UnformatHourAccess = await _context.Access.Select(la => la.TimeAccess).FirstAsync();
            // Parse do tipo 'var' para 'DateTime'
            DateTime parsedTime = DateTime.Parse(UnformatHourAccess);
            var HourAccess = parsedTime.ToString("HH:mm");
            return Ok(new { HourAccess });
        }

        [HttpGet("dailyaccess")]
        public async Task<ActionResult<IEnumerable<Access>>> GetDailyAccess()
        {
            //Consulta para retornar os acessos
            // formato de data armazenado no banco: AAAA-MM-DD HH:MM:SS

            var DailyAccess = await _context.Access.Select(da => da.TimeAccess).ToListAsync(); // -> O(n)?

            // Esta lista armazena apenas os dias e comparada ao dia de hoje podemos retornar quantos acessos foram feitos
            // em função do dia atual:
            // (Observe que estes valores variam de 01 à 31) 2024-12-09 12:00:0

            var DayList = DailyAccess.Select(da => DateTime.Parse(da).ToString("dd")).ToList();// -> O(n)?

            // Finalmente podemos contabilizar o número de acessos dado que este resultado
            // é obtido quando somamos o número de elementos presentes na lista cujo o seu valor    
            // é igual ao dia de hoje.
            var TodayAccess = DayList.Count(da => da == DateTime.Now.ToString("dd")); // --> O(n)?


            return Ok(new { TodayAccess });
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
