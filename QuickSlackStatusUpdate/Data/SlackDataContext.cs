using Microsoft.EntityFrameworkCore;
using System;

namespace QuickSlackStatusUpdate.Data
{
    public class SlackDataContext : DbContext
    {
        public DbSet<WorkspaceToken> WorkspaceTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=workspaceapp.db");
        }
    }

    public class WorkspaceToken
    {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public string AppId { get; set; }
        public string TeamId { get; set; }
    }
}
