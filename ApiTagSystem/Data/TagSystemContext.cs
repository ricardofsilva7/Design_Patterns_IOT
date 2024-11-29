using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApiTagSystem;

namespace ApiTagSystem.Data
{
    public class TagSystemContext : DbContext
    {
        public TagSystemContext (DbContextOptions<TagSystemContext> options)
            : base(options)
        {
        }

        public DbSet<ApiTagSystem.Login> Login { get; set; } = default!;
        public DbSet<ApiTagSystem.Acesses> Acesses { get; set; } = default!;
        public DbSet<ApiTagSystem.Users> Users { get; set; } = default!;
    }
}
