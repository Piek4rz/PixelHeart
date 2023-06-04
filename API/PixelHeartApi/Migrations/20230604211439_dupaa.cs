using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PixelHeartApi.Migrations
{
    /// <inheritdoc />
    public partial class dupaa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Match_Users_SexId",
                table: "Match");

            migrationBuilder.DropForeignKey(
                name: "FK_Match_Users_UserId",
                table: "Match");

            migrationBuilder.DropForeignKey(
                name: "FK_Match_Users_UserId1",
                table: "Match");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Match",
                table: "Match");

            migrationBuilder.RenameTable(
                name: "Match",
                newName: "Matches");

            migrationBuilder.RenameIndex(
                name: "IX_Match_UserId1",
                table: "Matches",
                newName: "IX_Matches_UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_Match_UserId",
                table: "Matches",
                newName: "IX_Matches_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Match_SexId",
                table: "Matches",
                newName: "IX_Matches_SexId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Matches",
                table: "Matches",
                column: "MatchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Users_SexId",
                table: "Matches",
                column: "SexId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Users_UserId",
                table: "Matches",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Users_UserId1",
                table: "Matches",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Users_SexId",
                table: "Matches");

            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Users_UserId",
                table: "Matches");

            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Users_UserId1",
                table: "Matches");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Matches",
                table: "Matches");

            migrationBuilder.RenameTable(
                name: "Matches",
                newName: "Match");

            migrationBuilder.RenameIndex(
                name: "IX_Matches_UserId1",
                table: "Match",
                newName: "IX_Match_UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_Matches_UserId",
                table: "Match",
                newName: "IX_Match_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Matches_SexId",
                table: "Match",
                newName: "IX_Match_SexId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Match",
                table: "Match",
                column: "MatchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Match_Users_SexId",
                table: "Match",
                column: "SexId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Match_Users_UserId",
                table: "Match",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Match_Users_UserId1",
                table: "Match",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
