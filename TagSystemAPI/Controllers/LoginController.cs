using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TagSystemAPI;
using TagSystemAPI.Data;

namespace TagSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly TagSystemContext _context;

        public LoginController(TagSystemContext context)
        {
            _context = context;
        }

        // GET: api/Login
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Login>>> GetLogin()
        {
            return await _context.Login.ToListAsync();
        }

        // GET: api/Login/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Login>> GetLogin(int id)
        {
            var login = await _context.Login.FindAsync(id);

            if (login == null)
            {
                return NotFound();
            }

            return login;
        }

        // PUT: api/Login/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLogin(int id, LoginDTO loginDTO)
        {
            // Verifica se o ID é válido
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }

            // Busca o login correspondente no banco de dados
            var existingLogin = await _context.Login.FindAsync(id);
            if (existingLogin == null)
            {
                return NotFound();
            }

            // Atualiza os campos com os dados do DTO
            existingLogin.Username = loginDTO.Username;
            existingLogin.Password = loginDTO.Password;

            _context.Entry(existingLogin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginExists(id))
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


        // POST: api/Login
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Create")]
        public async Task<ActionResult<Login>> PostLogin(LoginDTO loginDTO)
        {

            var login = new Login
            {
                Username = loginDTO.Username,
                Password = loginDTO.Password
            };

            _context.Login.Add(login);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLogin), new { id = login.Id }, LoginToDTO(login));
        }

        // POST: api/Login
        [HttpPost("Authenticate")]
        public async Task<ActionResult<Login>> Authenticate(LoginDTO loginDTO)
        {
            // Busca pelo usuário e senha no banco de dados
            var existingLogin = await _context.Login
                .FirstOrDefaultAsync(l => l.Username == loginDTO.Username && l.Password == loginDTO.Password);

            if (existingLogin == null)
            {
                //Retorna erro de autenticação
                return Unauthorized(new { message = "Invalid username or password" });
            }

            //Retorna o usuário encontrado
            return Ok("Login existente");
        }


        // DELETE: api/Login/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLogin(int id)
        {
            var login = await _context.Login.FindAsync(id);
            if (login == null)
            {
                return NotFound();
            }

            _context.Login.Remove(login);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginExists(int id)
        {
            return _context.Login.Any(e => e.Id == id);
        }

        private static LoginDTO LoginToDTO(Login login) =>
        new LoginDTO{
            Username = login.Username,
            Password = login.Password
        };
    }
}
