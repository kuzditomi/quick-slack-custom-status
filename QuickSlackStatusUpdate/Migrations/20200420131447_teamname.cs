using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickSlackStatusUpdate.Migrations
{
    public partial class teamname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TeamName",
                table: "WorkspaceTokens",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TeamName",
                table: "WorkspaceTokens");
        }
    }
}
