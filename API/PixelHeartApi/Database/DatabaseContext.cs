using PixelHeartApi.Models;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.EntityFrameworkCore;
using PixelHeartApi.Models;
using System.Collections.Generic;

namespace PixelHeartApi.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<UserGame> UserGames { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Match>()
            .HasOne(p => p.User)
            .WithMany()
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Match>()
                        .HasOne(p => p.Sex)
                        .WithMany()
                        .HasForeignKey(p => p.SexId)
                        .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
