using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebApplication4.Migrations
{
    public partial class f3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "Action",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Wochentag",
                table: "Action",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Wochentag",
                table: "Action");

            migrationBuilder.AlterColumn<string>(
                name: "Date",
                table: "Action",
                nullable: true,
                oldClrType: typeof(DateTime));
        }
    }
}
