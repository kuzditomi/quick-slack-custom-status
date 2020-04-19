using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace QuickSlackStatusUpdate.Data
{
    public class SlackDataContext : DbContext
    {
        public SlackDataContext(DbContextOptions options): base(options)
        {
        }

        public DbSet<WorkspaceToken> WorkspaceTokens { get; set; }
    }

    public class WorkspaceToken
    {
        public Guid Id { get; set; }
        public string Token { get; set; }
        public string AppId { get; set; }
        public string TeamId { get; set; }
    }
}
