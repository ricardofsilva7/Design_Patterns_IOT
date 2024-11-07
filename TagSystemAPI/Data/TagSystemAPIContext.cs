using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TagSystemAPI.Models;

namespace TagSystemAPI.Data
{
    public class TagSystemAPIContext : DbContext
    {
        public TagSystemAPIContext (DbContextOptions<TagSystemAPIContext> options)
            : base(options)
        {
        }

        public DbSet<TagSystemAPI.Models.Access> Access { get; set; } = default!;
        public DbSet<TagSystemAPI.Models.Denied> Denied { get; set; } = default!;
        public DbSet<TagSystemAPI.Models.Log> Log { get; set; } = default!;
        public DbSet<TagSystemAPI.Models.Login> Login { get; set; } = default!;
        public DbSet<TagSystemAPI.Models.Room> Room { get; set; } = default!;
        public DbSet<TagSystemAPI.Models.User> User { get; set; } = default!;
    }
}
