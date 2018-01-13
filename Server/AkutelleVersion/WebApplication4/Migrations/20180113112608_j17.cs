using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebApplication4.Migrations
{
    public partial class j17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Birthday",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Business",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FamilyStatus",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Profession",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Business",
                table: "User");

            migrationBuilder.DropColumn(
                name: "FamilyStatus",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Profession",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "User");
        }
    }
}
